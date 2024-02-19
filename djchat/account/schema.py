from account.serializers import LoginSchemaSerializer
from drf_spectacular.extensions import OpenApiAuthenticationExtension, OpenApiViewExtension
from drf_spectacular.utils import extend_schema
from knox.serializers import UserSerializer as KnoxUserSerializer
from knox.settings import knox_settings
from rest_framework import serializers
from rest_framework.authtoken.serializers import AuthTokenSerializer

UserSerializer = knox_settings.USER_SERIALIZER or KnoxUserSerializer

login_docs = extend_schema(
    responses=LoginSchemaSerializer(),
    request=AuthTokenSerializer(),
)


class KnoxAuthentication(OpenApiAuthenticationExtension):
    """
    Knox authentication Open API definition.
    """

    target_class = "knox.auth.TokenAuthentication"
    name = "TokenAuthentication"

    def get_security_definition(self, auto_schema):
        """
        Custom definition for APIView.
        """
        return {
            "type": "apiKey",
            "in": "header",
            "name": "Authorization",
        }


class LogoutResponseSerializer(serializers.Serializer):
    """
    Empty logout response serializer
    """


class FixLogoutView(OpenApiViewExtension):
    target_class = "knox.views.LogoutView"

    def view_replacement(self):
        """
        Fix view
        """

        class Fixed(self.target_class):
            serializer_class = LogoutResponseSerializer

        return Fixed


class FixLogoutAllView(OpenApiViewExtension):
    target_class = "knox.views.LogoutAllView"

    def view_replacement(self):
        """
        Fix view
        """

        class Fixed(self.target_class):
            serializer_class = LogoutResponseSerializer

        return Fixed
