import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AppSettings } from '../types';

const fetchSettings = async (): Promise<AppSettings> => {
   const { data } = await axios.get('/api/settings');
   return data;
};

const WhatsAppWidget = () => {
    const { data: settings } = useQuery({ queryKey: ['settings'], queryFn: fetchSettings });

    if (!settings?.whatsapp?.enabled || !settings?.whatsapp?.number) return null;

    const whatsappUrl = `https://wa.me/${settings.whatsapp.number.replace(/[^0-9]/g, '')}`;

    return (
        <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
            aria-label="Contact us on WhatsApp"
        >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 3.825.001 6.938 3.113 6.939 6.938-.001 3.825-3.114 6.938-6.939 6.938z" />
            </svg>
            <span className="absolute right-full mr-4 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Need help? Chat with us
            </span>
        </a>
    );
};

export default WhatsAppWidget;
