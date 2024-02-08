import os

from django.core.exceptions import ValidationError
from PIL import Image


def validate_icon_image(image):
    if image:
        with Image.open(image) as img:
            if img.width > 70 or image.height > 70:
                raise ValidationError(f"Image size of {img.size} greater than 70 x 70")


def validate_image_file_extensions(image):
    if image:
        ext = os.path.splitext(image)[1]
        valid_extensions = [".jpg", ".jpeg", ".png", ".gif"]
        if not ext.lower() in valid_extensions:
            raise ValidationError(
                f"Unsupported file extensions. Must be one of {valid_extensions}"
            )


def validate_banner_image(image):
    pass
