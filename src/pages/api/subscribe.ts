export const POST = async ({ request }: { request: Request }) => {
  try {
    const body = await request.json();
    const { email, source, timestamp } = body;
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Option 1: ConvertKit Integration (when you have API key)
    if (import.meta.env.CONVERTKIT_API_KEY && import.meta.env.CONVERTKIT_FORM_ID) {
      const convertkitResponse = await fetch(`https://api.convertkit.com/v3/forms/${import.meta.env.CONVERTKIT_FORM_ID}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: import.meta.env.CONVERTKIT_API_KEY,
          email: email,
          tags: [`calories-landing-${source}`, 'early-access']
        })
      });
      
      if (!convertkitResponse.ok) {
        throw new Error('ConvertKit API error');
      }
    }
    
    // Option 2: Store locally (for development/backup)
    // In production, you'd use a proper database
    const subscriberData = {
      email,
      source,
      timestamp,
      id: crypto.randomUUID()
    };
    
    // For now, we'll just log it (in production, save to database)
    console.log('New subscriber:', subscriberData);
    
    // You could also store in a simple JSON file for development:
    // This is just for testing - use a proper database in production
    if (import.meta.env.MODE === 'development') {
      try {
        const fs = await import('fs/promises');
        const path = './subscribers.json';
        let subscribers = [];
        
        try {
          const existingData = await fs.readFile(path, 'utf-8');
          subscribers = JSON.parse(existingData);
        } catch {
          // File doesn't exist yet
        }
        
        subscribers.push(subscriberData);
        await fs.writeFile(path, JSON.stringify(subscribers, null, 2));
      } catch (error) {
        console.log('Could not save to local file:', error);
      }
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Successfully subscribed!' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(JSON.stringify({ 
      error: 'Subscription failed' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}; 