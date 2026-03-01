# Paula Portfolio — Azure Infrastructure Setup
# Run this script to provision all Azure resources from scratch.
# Prerequisites: az CLI logged in, correct subscription set.

$ErrorActionPreference = "Stop"

$subscriptionId = "b6baf6a3-39aa-45ce-9363-83e84a634034"
$resourceGroup = "rg-paula-portfolio"
$location = "eastus2"
$storageAccount = "stpaulaportfolio"
$containerName = "images"

Write-Host "=== Paula Portfolio Infrastructure Setup ===" -ForegroundColor Cyan

# Set subscription
az account set --subscription $subscriptionId
Write-Host "[1/4] Subscription set to: $subscriptionId"

# Create resource group
az group create --name $resourceGroup --location $location --output none
Write-Host "[2/4] Resource group '$resourceGroup' created in $location"

# Create storage account
az storage account create `
    --name $storageAccount `
    --resource-group $resourceGroup `
    --location $location `
    --sku Standard_LRS `
    --kind StorageV2 `
    --access-tier Hot `
    --allow-blob-public-access true `
    --output none
Write-Host "[3/4] Storage account '$storageAccount' created"

# Create blob container + CORS
$connStr = az storage account show-connection-string --name $storageAccount --resource-group $resourceGroup --output tsv
az storage container create --name $containerName --connection-string $connStr --public-access blob --output none
az storage cors add --connection-string $connStr --services b --origins "*" --methods GET HEAD OPTIONS --allowed-headers "*" --exposed-headers "*" --max-age 3600 --output none
Write-Host "[4/4] Blob container '$containerName' created with CORS configured"

Write-Host ""
Write-Host "=== Done! ===" -ForegroundColor Green
Write-Host "Blob URL: https://$storageAccount.blob.core.windows.net/$containerName/"
Write-Host ""
Write-Host "Next: Create Azure Static Web App via Azure Portal or CLI, linking to your GitHub repo."
