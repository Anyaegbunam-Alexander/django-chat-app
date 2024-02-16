from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from chat.models import Conversation, Message
from django.contrib.auth import get_user_model

User = get_user_model()


class ChatConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.channel_id = None
        self.user = None

    def connect(self):
        self.accept()
        self.scope
        self.channel_id = self.scope["url_route"]["kwargs"]["channel_id"]
        self.user = User.objects.get(id=1)
        async_to_sync(self.channel_layer.group_add)(
            self.channel_id,
            self.channel_name,
        )

    def receive_json(self, content):
        channel_id = self.channel_id
        sender = self.user
        message = content["message"]

        conversation, _ = Conversation.objects.get_or_create(channel_id=channel_id)
        new_message = Message.objects.create(
            conversation=conversation, sender=sender, content=message
        )

        async_to_sync(self.channel_layer.group_send)(
            self.channel_id,
            {
                "type": "chat.message",
                "id": new_message.id,
                "content": new_message.content,
                "sender": new_message.sender.username,
                "timestamp": new_message.timestamp.isoformat(),
                "conversation": new_message.conversation.id,
            },
        )

    def chat_message(self, event):
        self.send_json(event)

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.channel_id, self.channel_name)
        super().disconnect(close_code)
