import React, { useMemo, useState } from 'react';
import {
  Page,
  Navbar,
  NavTitle,
  NavTitleLarge,
  List,
  ListItem,
  Block,
  Button,
  Card,
  CardContent,
} from 'framework7-react';

const meetings = [
  {
    id: 'keynote',
    title: 'Opening Keynote',
    description: 'Vision, roadmap, and summit kick-off.',
    location: 'Main Stage',
    start: '2026-06-20T09:00:00',
    end: '2026-06-20T10:00:00',
  },
  {
    id: 'ai-panel',
    title: 'Enterprise AI Panel',
    description: 'Industry leaders discuss practical AI adoption.',
    location: 'Hall B',
    start: '2026-06-20T11:00:00',
    end: '2026-06-20T12:00:00',
  },
  {
    id: 'workshop',
    title: 'Hands-on Agent Workshop',
    description: 'Build your first production-ready AI workflow.',
    location: 'Workshop Room 2',
    start: '2026-06-20T14:00:00',
    end: '2026-06-20T15:30:00',
  },
];

const pad = (value) => String(value).padStart(2, '0');
const toIcsDate = (input) => {
  const date = new Date(input);
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
};
const escapeIcsText = (value) => value
  .replaceAll('\\', '\\\\')
  .replaceAll(';', '\\;')
  .replaceAll(',', '\\,')
  .replaceAll('\n', '\\n');

const buildIcs = (meeting) => {
  const stamp = toIcsDate(new Date().toISOString());
  const uid = `${meeting.id}@sn-ai-summit`;
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SN AI Summit//Meetings//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${toIcsDate(meeting.start)}`,
    `DTEND:${toIcsDate(meeting.end)}`,
    `SUMMARY:${escapeIcsText(meeting.title)}`,
    `DESCRIPTION:${escapeIcsText(meeting.description)}`,
    `LOCATION:${escapeIcsText(meeting.location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
};

const HomePage = () => {
  const [selectedId, setSelectedId] = useState(meetings[0].id);
  const selectedMeeting = useMemo(
    () => meetings.find((meeting) => meeting.id === selectedId),
    [selectedId],
  );

  const calendarUrl = useMemo(() => {
    if (!selectedMeeting) return '#';
    const ics = buildIcs(selectedMeeting);
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
  }, [selectedMeeting]);

  return (
    <Page name="home">
      <Navbar large>
        <NavTitle>SN AI Summit</NavTitle>
        <NavTitleLarge>SN AI Summit</NavTitleLarge>
      </Navbar>
      <Block strong inset>
        <p>Select a meeting and add it to your iOS Calendar.</p>
      </Block>
      <List mediaList inset strongIos dividersIos>
        {meetings.map((meeting) => (
          <ListItem
            key={meeting.id}
            title={meeting.title}
            subtitle={`${new Date(meeting.start).toLocaleString()} - ${new Date(meeting.end).toLocaleTimeString()}`}
            text={meeting.location}
            radio
            checked={selectedId === meeting.id}
            name="meeting"
            onChange={() => setSelectedId(meeting.id)}
          />
        ))}
      </List>
      {selectedMeeting && (
        <Card inset>
          <CardContent padding>
            <p><strong>Selected:</strong> {selectedMeeting.title}</p>
            <p>{selectedMeeting.description}</p>
            <p><strong>Location:</strong> {selectedMeeting.location}</p>
            <Button
              fill
              external
              target="_blank"
              rel="noopener noreferrer"
              href={calendarUrl}
              download={`${selectedMeeting.id}.ics`}
            >
              Add to iOS Calendar
            </Button>
          </CardContent>
        </Card>
      )}
    </Page>
  );
};
export default HomePage;