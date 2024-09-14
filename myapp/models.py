from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractUser, PermissionsMixin, Permission, Group
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
class Article(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='articles')
    title = models.CharField(max_length=200)
    text = models.TextField()
    img = models.ImageField(upload_to='images/')

    def __str__(self):
        return self.title

class Reclama(models.Model):
    title = models.CharField(max_length=100)
    img = models.ImageField(upload_to='reklama/')

    def __str__(self):
        return self.title
    


class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user( email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user( email, password, **extra_fields)



class User(AbstractUser, PermissionsMixin):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female')
    ]
    PERSON_CHOICES = [
        ('person', 'PERSON'),
        ('company', 'COMPANY')
    ]
    username = None
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    accounts_type = models.CharField(max_length=15, choices=PERSON_CHOICES)
    email = models.EmailField(unique=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    

    objects = CustomUserManager()

    def __str__(self):
        return self.email

from django.utils import timezone

class TemporaryAccountData(models.Model):
    first_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    accounts_type = models.CharField(max_length=15)
    gender = models.CharField(max_length=10)
    verification_code = models.CharField(max_length=6)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.email