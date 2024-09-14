from django.contrib import admin

# Register your models here.

from .models import Category, Article, User

# Category uchun Admin panelini sozlash
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)  # Admin ro'yxatida ko'rsatiladigan ustunlar
    search_fields = ('name',)  # Qidiruv maydoniga asoslangan ustunlar

# Article uchun Admin panelini sozlash
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'text', 'img')  # Ko'rsatiladigan ustunlar
    list_filter = ('category',)  # Filtr qo'yish uchun ustunlar
    search_fields = ('title', 'text')  # Qidiruv qilish uchun ustunlar
    raw_id_fields = ('category',)  # Kategoriyani tanlash uchun raw id ishlatish

# Accounts uchun Admin panelini sozlash
class AccountsAdmin(admin.ModelAdmin):
    list_display = ('email', 'accounts_type', 'gender')
    list_filter = ('accounts_type', 'gender')
    search_fields = ('email',)

# Modellarni admin paneliga qo'shish
admin.site.register(Category, CategoryAdmin)
admin.site.register(Article, ArticleAdmin)
admin.site.register(User, AccountsAdmin)
