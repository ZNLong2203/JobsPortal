import { useMemo } from 'react'

interface MessageContentProps {
  content: string
}

export function MessageContent({ content }: MessageContentProps) {
  const formattedContent = useMemo(() => {
    return content.split('\n\n').map((paragraph, pIndex) => {
      if (paragraph.includes('* **')) {
        const items = paragraph.split('* ')
        return (
          <div key={pIndex} className="space-y-2">
            {items.filter(Boolean).map((item, iIndex) => {
              const processedItem = item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              return (
                <div key={iIndex} className="flex items-start">
                  <span className="mr-2">•</span>
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: processedItem 
                    }} 
                    className="[&>strong]:font-bold"
                  />
                </div>
              )
            })}
          </div>
        )
      }

      const processedParagraph = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      return (
        <div
          key={pIndex}
          dangerouslySetInnerHTML={{ 
            __html: processedParagraph 
          }}
          className="[&>strong]:font-bold"
        />
      )
    })
  }, [content])

  return (
    <div className="space-y-4 whitespace-pre-wrap">
      {formattedContent}
    </div>
  )
}

