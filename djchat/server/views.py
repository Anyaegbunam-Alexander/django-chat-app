from django.db.models import Count
from rest_framework import status, viewsets
from rest_framework.exceptions import NotAuthenticated, NotFound, ValidationError
from rest_framework.request import Request
from rest_framework.response import Response
from server.models import Category, Server
from server.schema import server_list_doc
from server.serializers import CategorySerializer, ServerSerializer
from drf_spectacular.utils import extend_schema


class CategoryListViewSet(viewsets.ViewSet):
    queryset = Category.objects.all()

    @extend_schema(responses=CategorySerializer)
    def list(self, request):
        serializer = CategorySerializer(self.queryset, many=True)
        return Response(serializer.data, status.HTTP_200_OK)


class ServerListViewSet(viewsets.ViewSet):
    queryset = Server.objects.all()

    @server_list_doc
    def list(self, request: Request) -> Response:
        """
        List servers based on provided query parameters.

        This method retrieves a list of servers based on the provided query parameters
        such as category, quantity, filtering by user, server ID, and whether to include
        the number of members in each server.

        Args:
            request (Request): The HTTP request object containing query parameters.

        Returns:
            Response: The HTTP response object containing serialized server data.

        Raises:
            `NotAuthenticated`: If the request is trying to filter by user or `server_id`,
                but the user is not authenticated.
            `NotFound`: If `server_id` is provided but no server with the given ID is found.
            `ValidationError`: If the `server_id` provided is invalid or cannot be converted to an integer.

        Detailed Explanation:
        - The `category` query parameter filters servers based on their category name.
        - The `quantity` query parameter limits the number of servers to be returned.
        - The `by_user` query parameter, when set to `true`, filters servers where the current user is a member.
        - The `server_id` query parameter filters servers by their unique ID.
        - The `with_num_members` query parameter, when set to `true`, includes the number of members
          in each server in the response.

        Note:
        - When `by_user` or `server_id` parameters are used, the user must be authenticated.
        - If `server_id` is provided and no server with the given ID exists, a NotFound exception is raised.
        - If `server_id` provided cannot be converted to an integer, a ValidationError is raised.

        Example Usage:
        `GET /servers/?category=gaming&qty=10&by_user=true&with_num_members=true`\n
        This will return a list of up to 10 gaming servers where the current user is a member,
        including the number of members in each server.

        """
        category = request.query_params.get("category")
        quantity = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        server_id = request.query_params.get("server_id")
        with_num_members = request.query_params.get("with_num_members") == "true"

        if (by_user) and not request.user.is_authenticated:
            raise NotAuthenticated()

        queryset = self.queryset

        if by_user:
            user = request.user
            queryset = queryset.filter(members=user)
            pass

        if category:
            queryset = queryset.filter(category__name=category)

        if server_id:
            try:
                queryset = queryset.filter(id=int(server_id))
                if not queryset.exists():
                    raise NotFound(f"Server with {server_id} not found")

            except Exception:
                raise ValidationError("Invalid Server id")

        if with_num_members:
            queryset = self.queryset.annotate(num_members=Count("members"))

        if quantity:
            queryset = queryset[: int(quantity)]

        serializer = ServerSerializer(
            queryset, many=True, context={"num_members": with_num_members}
        )
        return Response(serializer.data, status.HTTP_200_OK)
