from langchain_community.document_loaders import PyPDFLoader, TextLoader


def load_pdf(file_path: str):
    loader = PyPDFLoader(file_path)

    documents = loader.load()

    return documents


def load_text(file_path: str):
    loader = TextLoader(
        file_path,
        encoding="utf-8",
    )

    documents = loader.load()

    return documents