from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User


# import
from django.core.mail import send_mail
from django.views import View
from .models import User, TemporaryAccountData

# Create your views here.

def home(request):
    return render(request, 'index.html')
def index(request):
    return render(request, 'index.html')
def six_pages(request):
    return render(request, 'pages/M_six.html')
def five_pages(request):
    return render(request, 'pages/M_five.html')
def four_pages(request):
    return render(request, 'pages/M_four.html')
def three_pages(request):
    return render(request, 'pages/M_three.html')
def two_pages(request):
    return render(request, 'pages/M_two.html')
def one_pages(request):
    return render(request, 'pages/M_one.html')


from django.contrib.auth import get_user_model
User = get_user_model()

from django.contrib.auth import login, logout, authenticate
from django.conf import settings
from django.utils.crypto import get_random_string

class RegisterView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'registerPage/register.html')
    def post(self, request, *args, **kwargs):
        first_name = request.POST.get('first_name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        accounts_type = request.POST.get('accounts_type')
        gender = request.POST.get('gender')

        if TemporaryAccountData.objects.filter(email=email).exists():
            return render(request, 'registerPage/register.html', {
                'error': 'Bu email bilan allaqachon ro\'yxatdan o\'tilgan.'
            })

        verification_code = get_random_string(length=6, allowed_chars='1234567890')

        temp_account = TemporaryAccountData.objects.create(
            first_name=first_name,
            email=email,
            password=password,  
            accounts_type=accounts_type,
            gender=gender,
            verification_code=verification_code,
            is_verified=False
        )

        send_mail(
            subject="Tasdiqlash kodi",
            message=f"Xurmatli {first_name}, ro'yxatdan muvaffaqiyatli o'tdingiz. Tasdiqlash kodingiz: {verification_code}",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            fail_silently=False,
        )

        request.session['email'] = email
        return redirect('verify_email')

class VerifyEmailView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'registerPage/verify_email.html')
    
    def post(self, request, *args, **kwargs):
        email = request.session.get('email')
        verification_code_input = request.POST.get('verification_code')

        try:
            temp_account = TemporaryAccountData.objects.get(email=email, verification_code=verification_code_input)
            if temp_account:
                user = User.objects.create_user(
                    first_name=temp_account.first_name,
                    email=temp_account.email,
                    password=temp_account.password,
                    accounts_type=temp_account.accounts_type,
                    gender=temp_account.gender,
                )
                temp_account.is_verified = True
                temp_account.save()
                request.session.pop('email', None)
                return redirect('login')

        except TemporaryAccountData.DoesNotExist:
            return render(request, 'registerPage/verify_email.html', {'error': 'Tasdiqlash kodi noto‘g‘ri.'})

        return render(request, 'registerPage/verify_email.html')

class LoginView(View):
    def get(self, request):
        return render(request, 'registerPage/login.html')

    def post(self, request):
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            return render(request, 'registerPage/login.html', {
                'error': 'Iltimos, to\'g\'ri foydalanuvchi nomi va parolni kiriting. Ikkala maydon ham katta-kichik harf sezgir.'
            })

class LogoutView(View):
        def get(self, request):
            logout(request)
            return redirect('login')