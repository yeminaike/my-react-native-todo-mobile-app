
// import { query } from './_generated/api'
import { mutation, query } from './_generated/server'
import { ConvexError, v } from "convex/values";

export const getTodos = query({

    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").order("desc").collect();
        return todos;
    }
})

// we are passing text into the argument because it was we are going to be posting the request

export const addTodo = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) => {
        const todoId = await ctx.db.insert("todos", {
            text: args.text,
            isCompleted: false
        })

        return todoId
    }

})

export const toggleTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        const todo = await ctx.db.get(args.id)

        if (!todo) throw new ConvexError("Todo not found")

        await ctx.db.patch(args.id, {

            isCompleted: !todo.isCompleted
        })

        return todo;
    }

})

export const deleteTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        const deleteTodo = await ctx.db.delete(args.id)

        return deleteTodo;
    }


})

export const updateTodo = mutation({
    args: {
        id: v.id("todos"),
        text: v.string(),
    },

    handler: async (ctx, args) => {
        const update = await ctx.db.patch(args.id, {
            // the new updated text below
            text: args.text,
        })
        return update;
    }

})

export const clearAllTodos = mutation({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").collect();

        for (const todo of todos) {
            await ctx.db.delete(todo._id)
        }
        return {deletedCount: todos.length}
    }
})