import pathlib

f = pathlib.Path('src/styles.css')
text = f.read_text(encoding='utf-8')

keyframes = '''

@keyframes orbFloat {
    0% {
        transform: translate(0, 0) scale(1);
    }
    33% {
        transform: translate(30px, -20px) scale(1.05);
    }
    66% {
        transform: translate(-20px, 15px) scale(0.95);
    }
    100% {
        transform: translate(10px, -10px) scale(1.02);
    }
}

@keyframes breathe {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.015);
    }
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}
'''

if 'orbFloat' not in text:
    text = text.rstrip() + keyframes

f.write_text(text, encoding='utf-8')
print("styles.css updated with animation keyframes")
