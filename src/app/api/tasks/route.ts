import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/tasks
export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: 'Unable to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/tasks
export async function POST(request: Request) {
  try {
    const { title } = await request.json();
    const task = await prisma.task.create({
      data: {
        title,
      },
    });
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unable to create task' },
      { status: 500 }
    );
  }
}

// PUT /api/tasks
export async function PUT(request: Request) {
  try {
    const { id, complited } = await request.json();
    const task = await prisma.task.update({
      where: { id },
      data: { complited },
    });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: 'Unable to update task' },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.task.delete({
      where: { id },
    });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unable to delete task' },
      { status: 500 }
    );
  }
}