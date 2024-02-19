from account.serializers import LoginSchemaSerializer
from drf_spectacular.utils import extend_schema
from knox.serializers import UserSerializer as KnoxUserSerializer
from knox.settings import knox_settings
from rest_framework.authtoken.serializers import AuthTokenSerializer

UserSerializer = knox_settings.USER_SERIALIZER or KnoxUserSerializer

login_docs = extend_schema(
    responses=LoginSchemaSerializer(),
    request=AuthTokenSerializer(),
)
