from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.shortcuts import render 
from .models import Blog

def blog_index(request):
    blogs = Blog.objects.all()
    return render(request, 'blog_home.html', {'blogs': blogs})

def blog_data(request):
    blogs = Blog.objects.all().values('title', 'description')  # Assuming 'image' field exists
    return JsonResponse(list(blogs), safe=False)

def blog(request):
    return render(request, "blog.html")

def blog_detail(request, id):
    # Fetch the blog by id, return 404 if not found
    blog = get_object_or_404(Blog, pk=id)
    return render(request, 'blog.html', {'blog': blog})

def calculators(request, type='loan'):
    valid_types = ['loan', 'investment', 'savings', 'budget', 'tax']
    if type not in valid_types:
        type = "loan"

    context = {
        'type' : type,
        'show_loan_calculator': type == 'loan',
        'show_investment_calculator': type == 'investment',
        'show_savings_calculator': type == 'savings',
        'show_budget_planner': type == 'budget',
        'show_tax_estimator': type == 'tax'
    }
    return render(request, 'calculators.html', context)
