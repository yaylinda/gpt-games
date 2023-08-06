export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      completed_tasks: {
        Row: {
          created_at: string
          date_key: string
          task_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date_key: string
          task_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          date_key?: string
          task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "completed_tasks_task_id_fkey"
            columns: ["task_id"]
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "completed_tasks_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      pets: {
        Row: {
          created_at: string
          display_name: string
          friendliness: number
          id: string
          natures: string[]
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name: string
          friendliness: number
          id?: string
          natures: string[]
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string
          friendliness?: number
          id?: string
          natures?: string[]
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pets_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tasks: {
        Row: {
          created_at: string
          date_key: string
          difficulty: string
          emoji: string
          id: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date_key: string
          difficulty: string
          emoji: string
          id?: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          date_key?: string
          difficulty?: string
          emoji?: string
          id?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          display_name: string | null
          has_registered: boolean
          id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          has_registered?: boolean
          id?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          has_registered?: boolean
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

