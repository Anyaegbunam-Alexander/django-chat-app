from chat.models import Conversation
from chat.schema import message_list_docs
from chat.serializers import MessageSerializer
from rest_framework import status, viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response


class MessageViewSet(viewsets.ViewSet):
    @message_list_docs
    def list(self, request):
        channel_id = request.query_params.get("channel_id")
        try:
            channel_id = int(channel_id)
        except TypeError or ValueError:
            raise ValidationError("channel_id must be an integer")

        try:
            conversation = Conversation.objects.get(channel_id=channel_id)
            messages = conversation.messages.all()
        except Conversation.DoesNotExist:
            messages = None

        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
