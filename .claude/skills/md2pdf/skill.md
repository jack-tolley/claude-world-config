---
name: md2pdf
description: Convert markdown files to PDF using reportlab. Supports headings, code blocks, lists, tables, and basic formatting. No system dependencies required.
---

# Markdown to PDF Converter

Convert markdown files to well-formatted PDFs with GitHub-style formatting.

```
Find markdown → Convert to HTML → Generate PDF → Clean up
```

## When to Use

**Trigger signals:**
- "Convert this markdown to PDF"
- "Create a PDF from these docs"
- "I need a printable version"
- "Export markdown as PDF"
- "Make PDFs from all markdown files"

**Use when:**
- Creating shareable documentation
- Generating reports from markdown notes
- Preparing printable versions of docs
- Archiving markdown content
- Creating handouts or briefings

## Arguments

```
/md2pdf [optional: file or directory path]
```

**Examples:**
- `/md2pdf` - Convert all *.md files in current directory
- `/md2pdf README.md` - Convert specific file
- `/md2pdf docs/` - Convert all *.md files in docs directory

## Features

**Supported Markdown:**
- ✅ Headings (H1-H6)
- ✅ Paragraphs with line breaks
- ✅ **Bold** and *italic* text
- ✅ Code blocks with syntax highlighting styling
- ✅ Inline `code`
- ✅ Bulleted and numbered lists
- ✅ Tables (basic support)
- ✅ Blockquotes

**Output Styling:**
- A4 page size
- Professional margins (72pt / 1 inch)
- GitHub-style code blocks (monospace, gray background)
- Clear heading hierarchy
- Automatic page breaks
- Title derived from filename

## Workflow

### Phase 1: Locate Conversion Script (1 min)

The conversion script is located at:
```
/Users/Jack/Documents/claude-world/.claude/scripts/simple_md_to_pdf.py
```

### Phase 2: Determine Target (1 min)

**If no argument provided:**
- Use current working directory
- Convert all `*.md` files found

**If file path provided:**
- Convert that specific file only
- Verify file exists and is `.md`

**If directory path provided:**
- Find all `*.md` files in that directory
- Convert each one

### Phase 3: Execute Conversion (1-5 min)

**Single file conversion:**
```bash
cd /path/to/directory
cp /Users/Jack/Documents/claude-world/.claude/scripts/simple_md_to_pdf.py .
python3 simple_md_to_pdf.py
rm simple_md_to_pdf.py
```

**The script automatically:**
1. Finds all `*.md` files in current directory
2. Converts markdown → HTML → PDF
3. Creates PDF with same basename (e.g., `README.md` → `README.pdf`)
4. Reports success/failure for each file

### Phase 4: Verify Output (1 min)

```bash
# List created PDFs with sizes
ls -lh *.pdf

# Quick count
echo "Converted $(ls -1 *.pdf 2>/dev/null | wc -l) files to PDF"
```

### Phase 5: Report Results

**Success output:**
```
Found N markdown file(s):

✓ Converted: file1.md → file1.pdf
✓ Converted: file2.md → file2.pdf

==================================================
Conversion complete: N/N files converted successfully.

PDF files created in: /path/to/directory
```

**Partial failure output:**
```
Found N markdown file(s):

✓ Converted: file1.md → file1.pdf
✗ Failed to convert file2.md: [error message]

==================================================
Conversion complete: 1/2 files converted successfully.
```

## Requirements

**Python packages (should be installed):**
- `markdown` - Converts markdown to HTML
- `reportlab` - Generates PDF files

**Check installation:**
```bash
python3 -c "import markdown, reportlab; print('✓ All dependencies installed')"
```

**If missing:**
```bash
python3 -m pip install markdown reportlab
```

## Technical Details

### Conversion Process

1. **Markdown parsing:**
   - Uses Python `markdown` library with extensions:
     - `extra` - Tables, footnotes, etc.
     - `codehilite` - Syntax highlighting metadata
     - `tables` - Table support

2. **HTML to PDF:**
   - Custom HTML parser converts to ReportLab flowables
   - Paragraph styles for headings (H1-H6)
   - Preformatted text for code blocks
   - Bullet points for list items

3. **Styling:**
   - Title: Filename with hyphens/underscores as spaces
   - Headings: Hierarchical sizing (24pt → 14pt)
   - Code: Courier font, 9pt, gray background
   - Body: Standard sans-serif, 11pt, 1.6 line height

### Limitations

- **Tables:** Basic support (borders, cells) - complex layouts may not render perfectly
- **Images:** Not currently supported
- **HTML:** Only basic HTML tags supported (headings, p, code, pre, lists, strong, em)
- **Links:** Not rendered as clickable links in PDF
- **Nested lists:** Limited nesting support

### Customization

To modify styling, edit the script:
```python
# Page size (default: A4)
pagesize=A4

# Margins (default: 72pt = 1 inch)
rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=72

# Code style
fontSize=9, fontName='Courier', backColor='#f6f8fa'
```

## Output Format

**File naming:**
- Input: `my-document.md`
- Output: `my-document.pdf`
- Preserves original filename, changes extension only

**File location:**
- PDFs created in same directory as source `.md` files
- Original markdown files unchanged

## Examples

### Example 1: Convert all docs in current directory
```
User: "Convert all markdown files to PDF"

Actions:
1. Copy conversion script to current directory
2. Run python3 simple_md_to_pdf.py
3. Report results
4. Clean up script
```

### Example 2: Convert specific file
```
User: "/md2pdf README.md"

Actions:
1. Check README.md exists
2. Copy script to directory containing README.md
3. Run conversion
4. Verify README.pdf created
5. Report size and location
6. Clean up script
```

### Example 3: Convert files in another directory
```
User: "/md2pdf docs/"

Actions:
1. Navigate to docs/ directory
2. Copy conversion script
3. Run on all *.md files
4. List created PDFs
5. Clean up script
```

## Quality Checklist

After conversion:
- [ ] All markdown files processed
- [ ] PDF files created with correct names
- [ ] Headings formatted correctly
- [ ] Code blocks readable (monospace, formatted)
- [ ] Lists display properly
- [ ] File sizes reasonable (not bloated)
- [ ] Conversion script cleaned up

## Troubleshooting

### Error: No module named 'markdown'
```bash
python3 -m pip install markdown
```

### Error: No module named 'reportlab'
```bash
python3 -m pip install reportlab
```

### Error: Permission denied
```bash
# Check file permissions
ls -la *.md

# Make sure directory is writable
touch test.pdf && rm test.pdf
```

### PDFs look wrong
- Check if markdown syntax is valid
- Complex tables may need simplification
- Images are not supported (will be ignored)
- Some HTML/CSS won't render

### Large files
- Script loads entire file into memory
- Very large markdown files (>10MB) may be slow
- Consider splitting large documents

## Anti-Patterns

| Avoid | Instead |
|-------|---------|
| Converting files with images | Remove images or use alternative tool |
| Complex nested tables | Simplify table structure |
| Leaving script in directory | Always clean up after conversion |
| Converting non-markdown files | Check file extension first |
| Assuming all markdown features work | Test with sample first |

## Integration Tips

### After /research
```bash
# Research outputs are often markdown
cd research-output/
/md2pdf
# Creates shareable PDF reports
```

### With documentation
```bash
# Convert project docs to PDF for distribution
/md2pdf docs/
# Generates PDF handbook
```

### For handoffs
```bash
# Create PDFs of session notes before /closedown
/md2pdf SESSION-*.md
# Archivable documentation
```

## Script Location

**Primary location:**
```
/Users/Jack/Documents/claude-world/.claude/scripts/simple_md_to_pdf.py
```

**Script is reusable:**
- Copy to any directory
- Run on local markdown files
- Self-contained (no external config)
- Clean up after use

## Output Example

```
$ /md2pdf

Found 3 markdown file(s):

✓ Converted: README.md → README.pdf
✓ Converted: CONTRIBUTING.md → CONTRIBUTING.pdf
✓ Converted: CHANGELOG.md → CHANGELOG.pdf

==================================================
Conversion complete: 3/3 files converted successfully.

PDF files created in: /Users/Jack/project/docs

Created PDFs:
  README.pdf (4.2 KB)
  CONTRIBUTING.pdf (3.8 KB)
  CHANGELOG.pdf (5.1 KB)
```
