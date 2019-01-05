class Api::ReviewsController < ApplicationController
    before_action :set_product
    before_action :set_review, only: [:show, :update, :destroy]
    
    def index
        render json: @product.reviews.all
    end
    
    def show
        render json: @review
    end
    
    def create
        @review = @product.reviews.new(review_params)
        if @review.save
        render json: @review
        else
        render json: @review.errors, status: 422
        end
    end
    
    def update
        if @review.update(review_params)
        render json: @review
        else
        render json: @review.errors, status: 422
        end
    end
    
    def destroy
        @review.destroy
    end
    
    private
        def set_product
        @product = Product.find(params[:product_id])
        end
        def set_review
        @review = @product.reviews.find(params[:id])
        end
    
        def review_params
        params.require(:review).permit(:subject, :body, :stars, :date)
        end
end
