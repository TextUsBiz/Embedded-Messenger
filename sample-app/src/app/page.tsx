'use client';

import styles from './page.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { getConversationUrl } from '@textus/embedded/dist/Conversation/Conversation';

export default function Home() {
  // ==== FIELDS ==== //
  const mockData = [
    { name: 'Rachel Fernandes', phoneNumber: '17207968215', },
    { name: 'Nico Lewis', phoneNumber: '17203657056', },
    { name: 'William DeLuca', phoneNumber: '15616034088', },
    { name: 'Josh Phillips', phoneNumber: '12294008308', },
    { name: 'Jeff Golden', phoneNumber: '17042589539', },
    { name: 'Luke Mason', phoneNumber: '17193734707', },
    { name: 'Saundra Catalina', phoneNumber: '18609666329', },
    { name: 'Zachery Hostens', phoneNumber: '15636763130', },
    { name: 'Andrew Strovers', phoneNumber: '17203263430', },
    { name: 'Patrick Bair', phoneNumber: '17243558749', },
    { name: 'Maddie Jones', phoneNumber: '18128965559', },
    { name: 'Marc Barbeau', phoneNumber: '17207713443', },
    { name: 'Amanda Sands', phoneNumber: '13035035821', },
    { name: 'John Brown', phoneNumber: '13174125990', },
    { name: 'Josh Gaastra', phoneNumber: '17205323635', },
    { name: 'Sierra Serrette', phoneNumber: '17206571803', },
    { name: 'Sean Ryan', phoneNumber: '18433648362', },
    { name: 'Joel Schlundt', phoneNumber: '15747072205', },
    { name: 'Josh Sherman', phoneNumber: '13852340330', },
    { name: 'Judy Mosley', phoneNumber: '15026486675', },
    { name: 'Stephanie Huang', phoneNumber: '9192950237', },
    { name: 'Trey Burghardt', phoneNumber: '6615052260', },
    { name: 'QA User', phoneNumber: '17207068625', },
  ];

  // ==== STATE ==== //
  const [accountId, setAccountId] = useState<string>('bandwidth-v2-dev');
  const [phoneNumber, setPhoneNumber] = useState<string>(mockData[0].phoneNumber);
  const [conversationIframeUrl, setConversationIframeUrl] = useState<string | null>(null);

  // ==== METHODS ==== //
  const createIframe = useCallback(async () => {
    const url = await getConversationUrl(accountId, phoneNumber);
    setConversationIframeUrl(url);
  }, [accountId, phoneNumber]);


  // ==== EFFECTS ==== //
  useEffect(() => {
    createIframe();
  }, [createIframe]);

  // ==== RENDER ==== //
  return (
    <div className='container'>
      <div className="grid">
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Customer Phone Number</th>
            </tr>
          </thead>

          <tbody>
            {mockData.map((data, idx) => (
              <tr
                key={idx}
                onClick={() => {
                  setPhoneNumber(data.phoneNumber)
                }}
                className={data.phoneNumber === phoneNumber ? styles.selected : ''}>
                <td>{data.name}</td>
                <td>{data.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {conversationIframeUrl === null ? (
          <>Loading...</>
        ) : (
          <iframe src={conversationIframeUrl} width={800} height={800} />
        )}
      </div>
    </div>
  );
}
