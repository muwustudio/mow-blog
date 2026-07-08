import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ============================================================
// Content Collection Schema — 四维分类
// 笔记系统范式 v1
// ============================================================

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    updated: z.date().optional(),
    draft: z.boolean().default(false),

    // --- 四维分类 ---
    project: z.enum([
      'MMORPG',
      '四游戏-1',
      '四游戏-2',
      '四游戏-3',
      '四游戏-4',
      '白屋',
      '其他',
    ]),
    type: z.enum([
      '知识点',
      '踩坑记录',
      '设计决策',
      '复盘总结',
      '教程',
    ]),
    tech: z
      .array(
        z.enum([
          'C#',
          'C++',
          'Unity',
          'UE5',
          '蓝图',
          '网络',
          'AI工具',
          '图形学',
          '架构',
          '工具链',
        ])
      )
      .default([]),
    difficulty: z.enum(['基础', '进阶', '疑难']),

    // --- 可选字段 ---
    description: z.string().optional(),
    image: z.string().optional(),
    // 不填则自动从四维分类推导标签
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { posts };
