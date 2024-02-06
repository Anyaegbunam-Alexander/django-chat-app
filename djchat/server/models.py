from account.models import Account
from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, default="")

    def __str__(self) -> str:
        return self.name


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
