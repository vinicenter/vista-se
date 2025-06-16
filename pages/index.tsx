// app/page.tsx ou qualquer outro arquivo

import Image from 'next/image';
import { GRUPO_VIP_LINK, INSTAGRAM_LINK, VENDEDORA_JESSICA_LINK } from '@/constants';
import { Instagram, MessageCircle } from 'lucide-react';
import { Kalam } from 'next/font/google';
import ButtonLink from '@/components/ButtonLink';

const kalam = Kalam({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

export default function Home() {
  return (
    <main
      className={`flex flex-col items-center justify-center gap-12 min-h-screen ${kalam.className}`}
    >
      <Image src="/short-logo.png" alt="Logo" width={300} height={100} />

      <div className="flex flex-col gap-4">
        <ButtonLink href="/catalogo">
          <span>Catálogo</span>
        </ButtonLink>

        <ButtonLink href={INSTAGRAM_LINK}>
          <Instagram color="#F59A4E" size={24} />
          <span>Instagram</span>
        </ButtonLink>

        <ButtonLink href={VENDEDORA_JESSICA_LINK}>
          <MessageCircle color="#0CC042" size={24} />
          <span>Vendedora Jéssica</span>
        </ButtonLink>

        <ButtonLink href={GRUPO_VIP_LINK}>
          <MessageCircle color="#0CC042" size={24} />
          <span>Grupo VIP</span>
        </ButtonLink>
      </div>
    </main>
  );
}
