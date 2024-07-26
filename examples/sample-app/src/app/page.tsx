'use client';

import styles from './page.module.scss';
import { useEffect, useState, useRef } from 'react';
import { TextUsEmbeddedConversation, getConversationUrl } from '@textus/embedded/dist/Conversation/Conversation';

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
    { name: 'Unknown User', phoneNumber: '12345678901', },
  ];

  const defaultPhoneNumber = mockData[0].phoneNumber;

  // Using the TextUsEmbeddedConversation class to create an iframe.
  const embeddedConversation01 = useRef(new TextUsEmbeddedConversation('iframe-here', {
    channelPartner: 'TalentReef',
    height: '400px',
    width: '800px',
    contact: {
      phoneNumber: defaultPhoneNumber,
    }
  }));

  // Testing no width or height params.
  const embeddedConversation02 = useRef(new TextUsEmbeddedConversation(styles.iframe2Here, {
    channelPartner: 'TalentReef',
    contact: {
      phoneNumber: defaultPhoneNumber,
    }
  }));

  // ==== STATE ==== //
  const [phoneNumber, setPhoneNumber] = useState<string>(defaultPhoneNumber);
  const [conversationIframeUrl, setConversationIframeUrl] = useState<string | null>(null);

  // ==== EFFECTS ==== //
  useEffect(() => {
    // Using the global getConversationUrl function to get the URL for the iframe.
    const url = getConversationUrl(phoneNumber, 'TalentReef');
    setConversationIframeUrl(url);
  }, [phoneNumber]);

  useEffect(() => {
    embeddedConversation01.current.render();
    embeddedConversation02.current.render();
  }, []);

  // ==== METHODS ==== //
  const updateEmbeds = (phoneNumber: string) => {
    embeddedConversation01.current.setContact({
      phoneNumber,
    });
  };

  // ==== RENDER ==== //
  return (
    <div className='container'>
      <div className='grid'>
        <div>
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
                    setPhoneNumber(data.phoneNumber);
                    updateEmbeds(data.phoneNumber);
                  }}
                  className={data.phoneNumber === phoneNumber ? styles.selected : ''}>
                  <td>{data.name}</td>
                  <td>{data.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          {conversationIframeUrl === null ? (
            <>Loading...</>
          ) : (
            <>
              <h2>(Method-based)</h2>
              <iframe src={conversationIframeUrl} width={800} height={400} />
            </>
          )}

          <h2>(Class-based) Will update</h2>
          <div id='iframe-here'></div>

          <h2>(Class-based) Will not update</h2>
          <div id={styles.iframe2Here}></div>
        </div>
      </div>
    </div>
  );
}
