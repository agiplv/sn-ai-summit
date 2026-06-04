import { useMemo, useState } from 'react'
import {
  App as Framework7App,
  View,
  Page,
  Navbar,
  Block,
  BlockTitle,
  Button,
  Link,
} from 'framework7-react'
import { meetings } from './meetings'
import './App.css'

const f7params = {
  name: 'SN AI Summit',
  theme: 'auto',
  serviceWorker: {
    path: '/service-worker.js',
  },
}

function toICSDate(value) {
  return new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

function escapeICS(value) {
  return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')
}

function createICS(events) {
  const now = toICSDate(new Date())
  const rows = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ServiceNow//SN AI Summit 2026//EN',
    'CALSCALE:GREGORIAN',
  ]

  events.forEach((event) => {
    rows.push('BEGIN:VEVENT')
    rows.push(`UID:${event.id}@sn-ai-summit`)
    rows.push(`DTSTAMP:${now}`)
    rows.push(`DTSTART:${toICSDate(event.start)}`)
    rows.push(`DTEND:${toICSDate(event.end)}`)
    rows.push(`SUMMARY:${escapeICS(event.title)}`)
    rows.push(`LOCATION:${escapeICS(event.location)}`)
    rows.push(`DESCRIPTION:${escapeICS(event.description)}\\nSpeaker: ${escapeICS(event.speaker)}\\nMore info: https://rsvp.servicenow.com/stockholmsummit2026`)
    rows.push('END:VEVENT')
  })

  rows.push('END:VCALENDAR')
  return `${rows.join('\r\n')}\r\n`
}

function downloadCalendar(events, fileName) {
  const blob = new Blob([createICS(events)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function formatMeetingDate(start, end) {
  const options = { weekday: 'short', hour: '2-digit', minute: '2-digit' }
  return `${new Date(start).toLocaleDateString('en-GB', options)} - ${new Date(end).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })}`
}

function App() {
  const [selectedIds, setSelectedIds] = useState([])

  const selectedMeetings = useMemo(
    () => meetings.filter((meeting) => selectedIds.includes(meeting.id)),
    [selectedIds],
  )

  const toggleMeeting = (id) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id],
    )
  }

  return (
    <Framework7App {...f7params}>
      <View main>
        <Page>
          <Navbar title="SN AI Summit 2026 Planner" />

          <Block strong>
            <p>Select the meetings you want to attend, then export them to your iPhone calendar.</p>
            <p>
              Event source:{' '}
              <Link external href="https://rsvp.servicenow.com/stockholmsummit2026" target="_blank">
                Stockholm Summit 2026
              </Link>
            </p>
          </Block>

          <BlockTitle>Meetings</BlockTitle>
          {meetings.map((meeting) => {
            const checked = selectedIds.includes(meeting.id)

            return (
              <Block key={meeting.id} strong className="meeting-card">
                <label className="meeting-picker">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleMeeting(meeting.id)}
                    aria-label={`Select ${meeting.title}`}
                  />
                  <div>
                    <strong>{meeting.title}</strong>
                    <div>{formatMeetingDate(meeting.start, meeting.end)}</div>
                    <div>{meeting.location}</div>
                    <div>{meeting.speaker}</div>
                  </div>
                </label>
                <Button
                  small
                  outline
                  onClick={() => downloadCalendar([meeting], `${meeting.id}.ics`)}
                >
                  Add this meeting
                </Button>
              </Block>
            )
          })}

          <Block strong>
            <Button
              fill
              large
              disabled={selectedMeetings.length === 0}
              onClick={() => downloadCalendar(selectedMeetings, 'sn-ai-summit-selected-meetings.ics')}
            >
              Add selected meetings to iOS Calendar ({selectedMeetings.length})
            </Button>
            <p className="hint">
              On iPhone: open the downloaded .ics file and tap <strong>Add All</strong>.
            </p>
          </Block>
        </Page>
      </View>
    </Framework7App>
  )
}

export default App
