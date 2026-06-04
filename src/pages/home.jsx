import React, { useMemo, useState } from 'react';
import {
  Page,
  Navbar,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Searchbar,
  Subnavbar,
  List,
  ListItem,
  AccordionContent,
  Block,
  Button,
  Badge,
  Segmented,
} from 'framework7-react';
import { useStore } from 'framework7-react';
import {
  meetings,
  allRooms,
  formatTime,
  groupByTimeSlot,
  groupByRoom,
} from '../js/meetings';
import store from '../js/store';

const HomePage = () => {
  const [groupBy, setGroupBy] = useState('time'); // 'time' | 'room'
  const [roomFilter, setRoomFilter] = useState(null); // null = all, string = specific room
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const visitedMeetings = useStore(store, 'visitedMeetings');

  const searchFilteredMeetings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return meetings;
    return meetings.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const filteredMeetings = useMemo(() => {
    if (!roomFilter) return searchFilteredMeetings;
    return searchFilteredMeetings.filter((m) => m.location === roomFilter);
  }, [roomFilter, searchFilteredMeetings]);

  const groups = useMemo(() => {
    if (groupBy === 'room') return groupByRoom(filteredMeetings);
    return groupByTimeSlot(filteredMeetings);
  }, [groupBy, filteredMeetings]);

  const handleRoomFilter = (room) => {
    setRoomFilter((prev) => (prev === room ? null : room));
  };

  return (
    <Page name="home">
      <Navbar large>
        <NavTitle>SN AI Summit</NavTitle>
        <NavTitleLarge>SN AI Summit</NavTitleLarge>
        <NavRight>
          <Link
            iconF7={roomFilter || groupBy !== 'time' ? 'slider_horizontal_3_fill' : 'slider_horizontal_3'}
            iconOnly
            tooltip="Toggle filters"
            aria-label={showFilters ? 'Hide filters' : 'Show filters'}
            onClick={() => setShowFilters((v) => !v)}
          />
        </NavRight>
        <Subnavbar inner={false}>
          <Searchbar
            customSearch
            placeholder="Search sessions…"
            onSearchbarSearch={(_, query) => setSearchQuery(query)}
            onSearchbarClear={() => setSearchQuery('')}
            onSearchbarDisable={() => setSearchQuery('')}
          />
        </Subnavbar>
      </Navbar>

      {/* Group by + Room filter bar – hidden by default, revealed via filter icon */}
      {showFilters && (
        <Block strong inset className="filter-bar">
          <div className="filter-bar__group-toggle">
            <Segmented strong tag="div">
              <Button
                active={groupBy === 'time'}
                onClick={() => setGroupBy('time')}
              >
                By Time
              </Button>
              <Button
                active={groupBy === 'room'}
                onClick={() => setGroupBy('room')}
              >
                By Room
              </Button>
            </Segmented>
          </div>
          <div className="filter-bar__rooms">
            {allRooms.map((room) => (
              <Button
                key={room}
                small
                fill={roomFilter === room}
                outline={roomFilter !== room}
                className="filter-bar__room-chip"
                onClick={() => handleRoomFilter(room)}
              >
                {room}
              </Button>
            ))}
          </div>
        </Block>
      )}

      {/* Session agenda grouped by time slot or room - each group is collapsible */}
      {!groups.length && (
        <Block strong inset>
          <p>No sessions found{searchQuery ? ` for "${searchQuery}"` : ''}.</p>
        </Block>
      )}
      <List inset strongIos accordionList className="session-list">
        {groups.map(({ label, sessions }) => (
          <ListItem key={label} accordionItem title={label} className="time-slot-header">
            <AccordionContent>
              <List dividersIos className="session-sublist">
                {sessions.map((meeting) => (
                  <ListItem
                    key={meeting.id}
                    title={meeting.title}
                    after={groupBy === 'room'
                      ? `${formatTime(meeting.start)} – ${formatTime(meeting.end)}`
                      : meeting.location}
                    link={`/meeting/${meeting.id}/`}
                  >
                    {visitedMeetings.includes(meeting.id) && (
                      <Badge slot="after" color="green" className="visited-badge">✓</Badge>
                    )}
                  </ListItem>
                ))}
              </List>
            </AccordionContent>
          </ListItem>
        ))}
      </List>
    </Page>
  );
};

export default HomePage;
