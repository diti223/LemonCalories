export class TypewriterEffect {
  private element: HTMLElement;
  private text: string;
  private speed: number;
  private currentIndex: number;
  public onComplete?: () => void;

  constructor(element: HTMLElement, text: string, speed = 50) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.currentIndex = 0;
  }
  
  async start(): Promise<void> {
    for (let i = 0; i < this.text.length; i++) {
      this.element.textContent += this.text[i];
      await this.delay(this.speed);
    }
    this.onComplete?.();
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export function animateCounter(
  element: HTMLElement, 
  start: number, 
  end: number, 
  duration = 1000
): void {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      element.textContent = Math.round(end).toString();
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current).toString();
    }
  }, 16);
}

export function animateProcessingDots(element: HTMLElement): () => void {
  let dotCount = 0;
  const interval = setInterval(() => {
    if (element) {
      element.textContent = '.'.repeat((dotCount % 3) + 1);
    }
    dotCount++;
  }, 500);
  
  return () => clearInterval(interval);
} 