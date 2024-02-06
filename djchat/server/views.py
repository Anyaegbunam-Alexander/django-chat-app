from unittest import result
from rest_framework import status, viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from server.models import Server
from server.serializers import ServerSerializer
from rest_framework.exceptions import NotFound, ValidationError, NotAuthenticated


class ServerListViewSet(viewsets.ViewSet):
    queryset = Server.objects.all()

    def list(self, request: Request) -> Response:
        category = request.query_params.get("category")
        quantity = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        server_id = request.query_params.get("server_id")

        if by_user or server_id and not request.user.is_authenticated:
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

        if quantity:
            queryset = queryset[: int(quantity)]

        serializer = ServerSerializer(queryset, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
