package models

import (
	"gorm.io/gorm"
	"time"
)

// Todo represents a task in our todolist
type Todo struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	Title       string         `json:"title" binding:"required"`
	Description string         `json:"description"`
	Completed   bool           `json:"completed"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`
}