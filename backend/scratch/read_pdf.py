import PyPDF2

def extract_text_from_pdf(pdf_path, output_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in reader.pages:
            text += page.extract_text() + '\n'
        with open(output_path, 'w', encoding='utf-8') as out_file:
            out_file.write(text)

if __name__ == '__main__':
    extract_text_from_pdf('DATA PRODUK.pdf', 'scratch/pdf_text.txt')
