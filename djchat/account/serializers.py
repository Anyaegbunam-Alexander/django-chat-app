from django.contrib.auth import get_user_model
from faker import Faker
from rest_framework import serializers

fake = Faker()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["username", "email", "last_login", "id"]


class LoginSchemaSerializer(serializers.Serializer):
    expiry = serializers.DateTimeField()
    token = serializers.CharField()
    user = UserSerializer()
