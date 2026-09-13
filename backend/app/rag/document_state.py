document_uploaded = False


def set_document_uploaded(value: bool):
    global document_uploaded
    document_uploaded = value


def is_document_uploaded():
    return document_uploaded