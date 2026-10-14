import logging
import sys


def setup_logging():
    """Configure standardized application logger."""
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
        handlers=[
            logging.StreamHandler(sys.stdout)
        ]
    )
    logger = logging.getLogger("skilllink")
    logger.setLevel(logging.INFO)
    return logger


logger = setup_logging()
