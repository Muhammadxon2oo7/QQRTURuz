# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import PostViewSet

# router = DefaultRouter()
# router.register(r'posts', PostViewSet)

# urlpatterns = [
#     path('', include(router.urls)),
# ]

from django.conf import settings
from django.conf.urls.static import static

from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path(f'index.html', views.index, name='index'),  
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login', views.LoginView.as_view(), name='login'),
    path('register/verify_email', views.VerifyEmailView.as_view(), name='verify_email'),
    path('logout', views.LogoutView.as_view, name='logout'), 
    path('six_pages', views.six_pages, name='six_pages'),
    path('five_pages', views.five_pages, name='five_pages'),
    path('four_pages', views.four_pages, name='four_pages'),
    path('three_pages', views.three_pages, name='three_pages'),
    path('two_pages', views.two_pages, name='two_pages'),
    path('one_pages/', views.one_pages, name='one_pages'),
    # path('verify/<str:code>/', views.verify_email, name='email_verify'),
] 

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 