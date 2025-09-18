#!/bin/bash

# Verify Build Script
# Tests Next.js build with mock environment variables

echo "🔨 Testing build with mock environment variables..."

# Set mock environment variables for build
export STRIPE_SECRET_KEY="sk_test_mock_key_for_build_verification"
export NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_mock_key_for_build_verification"
export STRIPE_WEBHOOK_SECRET="whsec_mock_secret_for_build_verification"
export DATABASE_URL="postgres://mock:mock@localhost:5432/mock"
export RESEND_API_KEY="re_mock_api_key"
export ADMIN_TOKEN="mock_admin_token"
export NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Run the build
npm run build

# Check build status
if [ $? -eq 0 ]; then
    echo "✅ Build successful! Ready for deployment."
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi