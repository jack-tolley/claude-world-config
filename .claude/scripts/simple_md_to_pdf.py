#!/usr/bin/env python3
"""Simple markdown to PDF converter using reportlab."""
import markdown
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Preformatted, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_JUSTIFY
from pathlib import Path
from html.parser import HTMLParser
import re

class HTMLToReportLab(HTMLParser):
    """Convert simple HTML to ReportLab flowables."""

    def __init__(self, styles):
        super().__init__()
        self.styles = styles
        self.flowables = []
        self.current_text = []
        self.current_style = 'Normal'
        self.in_pre = False
        self.in_heading = False
        self.heading_level = 0

    def handle_starttag(self, tag, attrs):
        if tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            self.in_heading = True
            self.heading_level = int(tag[1])
            self.current_style = f'Heading{self.heading_level}'
        elif tag == 'p':
            self.current_style = 'Normal'
        elif tag == 'pre' or tag == 'code':
            self.in_pre = True
            self.current_style = 'Code'
        elif tag == 'strong' or tag == 'b':
            self.current_text.append('<b>')
        elif tag == 'em' or tag == 'i':
            self.current_text.append('<i>')
        elif tag == 'br':
            self.current_text.append('<br/>')

    def handle_endtag(self, tag):
        if tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            text = ''.join(self.current_text).strip()
            if text:
                try:
                    self.flowables.append(Paragraph(text, self.styles[self.current_style]))
                    self.flowables.append(Spacer(1, 0.2 * inch))
                except:
                    pass
            self.current_text = []
            self.in_heading = False
        elif tag == 'p':
            text = ''.join(self.current_text).strip()
            if text:
                try:
                    self.flowables.append(Paragraph(text, self.styles['Normal']))
                    self.flowables.append(Spacer(1, 0.1 * inch))
                except:
                    pass
            self.current_text = []
        elif tag == 'pre' or tag == 'code':
            if self.in_pre:
                text = ''.join(self.current_text)
                if text.strip():
                    try:
                        self.flowables.append(Preformatted(text, self.styles['Code']))
                        self.flowables.append(Spacer(1, 0.1 * inch))
                    except:
                        pass
                self.current_text = []
                self.in_pre = False
        elif tag == 'strong' or tag == 'b':
            self.current_text.append('</b>')
        elif tag == 'em' or tag == 'i':
            self.current_text.append('</i>')
        elif tag == 'ul' or tag == 'ol':
            self.flowables.append(Spacer(1, 0.1 * inch))
        elif tag == 'li':
            text = ''.join(self.current_text).strip()
            if text:
                try:
                    self.flowables.append(Paragraph(f'• {text}', self.styles['Normal']))
                except:
                    pass
            self.current_text = []

    def handle_data(self, data):
        if data.strip() or self.in_pre:
            self.current_text.append(data)

def convert_md_to_pdf(md_file):
    """Convert markdown file to PDF."""
    pdf_file = md_file.with_suffix('.pdf')

    try:
        # Read markdown
        with open(md_file, 'r', encoding='utf-8') as f:
            md_content = f.read()

        # Convert to HTML
        html_content = markdown.markdown(md_content, extensions=['extra', 'codehilite', 'tables'])

        # Create PDF
        doc = SimpleDocTemplate(
            str(pdf_file),
            pagesize=A4,
            rightMargin=72,
            leftMargin=72,
            topMargin=72,
            bottomMargin=72
        )

        # Create styles
        styles = getSampleStyleSheet()

        # Add custom code style if not exists
        if 'Code' not in styles:
            code_style = ParagraphStyle(
                'Code',
                parent=styles['Normal'],
                fontName='Courier',
                fontSize=9,
                leftIndent=20,
                rightIndent=20,
                spaceBefore=6,
                spaceAfter=6,
                backColor='#f6f8fa'
            )
            styles.add(code_style)

        # Parse HTML and build story
        parser = HTMLToReportLab(styles)
        parser.feed(html_content)

        # Add title from filename
        title = md_file.stem.replace('-', ' ').replace('_', ' ').title()
        story = [
            Paragraph(title, styles['Title']),
            Spacer(1, 0.3 * inch)
        ]
        story.extend(parser.flowables)

        # Build PDF
        doc.build(story)

        print(f"✓ Converted: {md_file.name} → {pdf_file.name}")
        return True

    except Exception as e:
        print(f"✗ Failed to convert {md_file.name}: {str(e)}")
        return False

def main():
    """Find all markdown files and convert them to PDF."""
    current_dir = Path.cwd()
    md_files = list(current_dir.glob('*.md'))

    if not md_files:
        print("No markdown files found in current directory.")
        return

    print(f"Found {len(md_files)} markdown file(s):\n")

    success_count = 0
    for md_file in md_files:
        if convert_md_to_pdf(md_file):
            success_count += 1

    print(f"\n{'='*50}")
    print(f"Conversion complete: {success_count}/{len(md_files)} files converted successfully.")

    if success_count > 0:
        print(f"\nPDF files created in: {current_dir}")

if __name__ == '__main__':
    main()
