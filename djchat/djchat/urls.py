from chat.consumers import ChatConsumer
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from server.views import CategoryListViewSet, ServerListViewSet
from chat.views import MessageViewSet

router = DefaultRouter()
router.register("api/servers", ServerListViewSet)
router.register("api/categories", CategoryListViewSet)
router.register("api/messages", MessageViewSet, basename="messages")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/docs/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/ui/", SpectacularSwaggerView.as_view()),
] + router.urls


websocket_urlpatterns = [path("<str:server_id>/<str:channel_id>/", ChatConsumer.as_asgi())]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
