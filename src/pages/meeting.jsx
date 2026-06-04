import React, { useMemo } from 'react';
import {
  Page,
  Navbar,
  Block,
  BlockTitle,
  Button,
  useStore,
} from 'framework7-react';
import { meetings, formatTime, buildIcs } from '../js/meetings';
import store from '../js/store';

const MeetingPage = ({ f7route }) => {
  const id = f7route.params.id;
  const meeting = useMemo(() => meetings.find((m) => m.id === id), [id]);
  const visitedMeetings = useStore(store, 'visitedMeetings');
  const isVisited = visitedMeetings.includes(id);

  const calendarUrl = useMemo(() => {
    if (!meeting) return '#';
    const ics = buildIcs(meeting);
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
  }, [meeting]);

  if (!meeting) {
    return (
      <Page name="meeting">
        <Navbar title="Session" backLink="Back" />
        <Block strong inset>
          <p>Session not found.</p>
        </Block>
      </Page>
    );
  }

  return (
    <Page name="meeting">
      <Navbar title="Session Details" backLink="Back" />

      <BlockTitle medium>{meeting.title}</BlockTitle>

      <Block strong inset className="meeting-detail-card">
        <div className="meeting-detail-row">
          <span className="meeting-detail-label">Time</span>
          <span className="meeting-detail-value">
            {formatTime(meeting.start)} – {formatTime(meeting.end)}
          </span>
        </div>
        <div className="meeting-detail-row">
          <span className="meeting-detail-label">Location</span>
          <span className="meeting-detail-value">{meeting.location}</span>
        </div>
        {meeting.description && (
          <div className="meeting-detail-row meeting-detail-row--description">
            <span className="meeting-detail-label">Details</span>
            <span className="meeting-detail-value session-description">
              {meeting.description}
            </span>
          </div>
        )}
      </Block>

      <Block className="meeting-detail-actions">
        <Button
          fill
          external
          target="_blank"
          rel="noopener noreferrer"
          href={calendarUrl}
          download={`${meeting.id}.ics`}
          className="meeting-detail-actions__calendar-btn"
        >
          Add to Calendar
        </Button>
        <Button
          className={`meeting-detail-actions__visited-btn${isVisited ? ' visited' : ''}`}
          fill={isVisited}
          outline={!isVisited}
          color={isVisited ? 'green' : undefined}
          onClick={() => store.dispatch('toggleVisited', id)}
        >
          {isVisited ? '✓ Visited' : 'Mark as Visited'}
        </Button>
      </Block>
    </Page>
  );
};

export default MeetingPage;
