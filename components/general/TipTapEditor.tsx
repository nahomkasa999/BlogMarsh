'use client';

import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import CharacterCount from '@tiptap/extension-character-count';
import Focus from '@tiptap/extension-focus';
import Paragraph from '@tiptap/extension-paragraph';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import FontFamily from '@tiptap/extension-font-family';

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false,
        codeBlock: false,
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: 'my-2',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Write something amazing... You can use MD format',
      }),
      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
      FontFamily.configure({
        types: ['textStyle'],
     
      }),
      CharacterCount.configure({
        limit: 10000,
      }),
      Underline,
      TextStyle,
      Highlight.configure({
        multicolor: true,
      }),
      Typography,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      Subscript,
      Superscript,
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const MenuButton = ({ onClick, active, children }: { onClick: () => void; active?: boolean; children: React.ReactNode }) => (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={`px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${
        active 
          ? 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-200' 
          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="relative bg-white dark:bg-gray-900 rounded-lg">
      {editor && (
        <BubbleMenu 
          className="bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden z-[100] px-1" 
          editor={editor} 
          tippyOptions={{ duration: 100 }}
        >
          <div className="flex items-center divide-x divide-gray-200 dark:divide-gray-700">
            <div className="flex items-center gap-0.5 p-0.5">
              <MenuButton 
                onClick={() => editor.chain().focus().toggleBold().run()} 
                active={editor.isActive('bold')}
              >
                B
              </MenuButton>
              <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>I</MenuButton>
              <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')}>U</MenuButton>
              <MenuButton onClick={() => editor.chain().focus().toggleSubscript().run()} active={editor.isActive('subscript')}>x₂</MenuButton>
              <MenuButton onClick={() => editor.chain().focus().toggleSuperscript().run()} active={editor.isActive('superscript')}>x²</MenuButton>
            </div>
            <div className="flex items-center gap-0.5 p-0.5">
              <select
                onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
                className="px-1 py-0.5 rounded text-xs border text-gray-600 dark:text-gray-300 dark:bg-gray-800"
              >
                <option value="Inter">Inter</option>
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
                <option value="monospace">Monospace</option>
              </select>
            </div>
            <div className="flex items-center gap-0.5 p-0.5">
              <MenuButton onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')}>
                Highlight
              </MenuButton>
            </div>
          </div>
        </BubbleMenu>
      )}

      {editor && (
        <FloatingMenu 
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-[100]" 
          editor={editor} 
          tippyOptions={{ duration: 100 }}
        >
          <div className="flex items-center divide-x divide-gray-200 dark:divide-gray-700">
            <div className="flex items-center gap-1 p-1">
              <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })}>H1</MenuButton>
              <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>H2</MenuButton>
            </div>
            <div className="flex items-center gap-1 p-1">
              <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>• List</MenuButton>
              <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>1. List</MenuButton>
              <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')}>Code</MenuButton>
            </div>
            <div className="flex items-center gap-1 p-1">
              <MenuButton onClick={() => editor.chain().focus().toggleTaskList().run()} active={editor.isActive('taskList')}>☐ Tasks</MenuButton>
              <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>Quote</MenuButton>
            </div>
          </div>
        </FloatingMenu>
      )}

      <EditorContent editor={editor} />

      <div className="border-t border-gray-200 dark:border-gray-700 p-1.5 flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-b-lg">
        <div className="flex items-center gap-1">
          <MenuButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })}>Left</MenuButton>
          <MenuButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })}>Center</MenuButton>
          <MenuButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })}>Right</MenuButton>
        </div>
        <div className="text-xs text-gray-400">
          {editor.storage.characterCount.characters()} characters
        </div>
      </div>
    </div>
  );
}
