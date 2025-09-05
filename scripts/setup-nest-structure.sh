#!/bin/bash

# List of directories to create
dirs=(
  "src"
  "src/config"
  "src/common"
  "src/common/decorators"
  "src/common/filters"
  "src/common/guards"
  "src/common/interceptors"
  "src/common/utils"
  "src/core"
  "src/core/logger"
  "src/core/exceptions"
  "src/modules"
  "src/modules/users/controllers"
  "src/modules/users/services"
  "src/modules/users/dtos"
  "src/modules/users/entities"
  "src/modules"
  "src/modules/auth/strategies"
  "src/modules/auth/guards"
  "src/modules/auth/dtos"
  "src/database"
  "src/database/seeds"
  "src/database/migrations"
  "src/middleware"
  "src/jobs"
  "src/schedulers"
  "src/tasks"
  "src/interfaces"
  "src/libs"
  "src/libs/mailer"
)

# Create directories and add .gitkeep
for dir in "${dirs[@]}"; do
  mkdir -p "$dir"
  touch "$dir/.gitkeep"
done

echo "Folders created and .gitkeep added to each."
