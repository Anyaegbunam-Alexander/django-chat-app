from account.models import Account
from django.db import models
from django.dispatch import receiver
from django.shortcuts import get_object_or_404


def category_icon_upload_path(instance, filename):
    return f"categories/{instance.id}/icons/{filename}"


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, default="")
    icon = models.FileField(upload_to=category_icon_upload_path, blank=True, null=True)

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        if self.id:
            existing = get_object_or_404(Category, id=self.id)
            if existing.icon != self.icon:
                existing.icon.delete(save=False)

        return super().save(*args, **kwargs)

    @receiver(models.signals.pre_delete, sender="server.Category")
    def category_delete_files(sender, instance, **kwargs):
        for field in instance._meta.fields:
            if field.name == "icon":
                file = getattr(instance, field.name)
                if file:
                    file.delete(save=False)


class Server(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(
        Account, null=True, on_delete=models.SET_NULL, related_name="servers"
    )
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="servers")
    description = models.CharField(max_length=250, blank=True, default="")
    members = models.ManyToManyField(Account)

    def __str__(self) -> str:
        return self.name


class Channel(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(
        Account, null=True, on_delete=models.SET_NULL, related_name="channels"
    )
    topic = models.CharField(max_length=100)
    server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name="channels")

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        return super().save(*args, **kwargs)
