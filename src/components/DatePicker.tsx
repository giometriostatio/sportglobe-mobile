import React, { useRef, useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';

interface Props {
  selectedDate: string; // YYYY-MM-DD
  onDateChange: (date: string) => void;
}

function formatYMD(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const SHORT_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/** Get the Monday (start of week) for a given date */
function getWeekStart(d: Date): Date {
  const copy = new Date(d);
  const day = copy.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Monday-based
  copy.setDate(copy.getDate() + diff);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

/** Build 14 days starting from a given Monday */
function buildDays(weekStart: Date, today: string): { date: string; label: string; dayNum: number; isToday: boolean }[] {
  const items: { date: string; label: string; dayNum: number; isToday: boolean }[] = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    const dateStr = formatYMD(d);
    items.push({
      date: dateStr,
      label: DAY_NAMES[d.getDay()],
      dayNum: d.getDate(),
      isToday: dateStr === today,
    });
  }
  return items;
}

/** Build calendar grid for a given month */
function buildCalendarMonth(year: number, month: number): (number | null)[][] {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = [];

  // Fill leading blanks (Sunday-start)
  for (let i = 0; i < firstDay; i++) {
    week.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

export function DatePicker({ selectedDate, onDateChange }: Props) {
  const today = useMemo(() => formatYMD(new Date()), []);
  const scrollRef = useRef<ScrollView>(null);
  const [calendarVisible, setCalendarVisible] = useState(false);

  // Parse selected date to derive weekStart
  const selectedParts = selectedDate.split('-').map(Number);
  const selectedDateObj = new Date(selectedParts[0], selectedParts[1] - 1, selectedParts[2]);

  const [weekStart, setWeekStart] = useState(() => getWeekStart(selectedDateObj));

  // Calendar modal state — starts at selected date's month
  const [calMonth, setCalMonth] = useState(selectedDateObj.getMonth());
  const [calYear, setCalYear] = useState(selectedDateObj.getFullYear());

  const days = useMemo(() => buildDays(weekStart, today), [weekStart, today]);

  // Header label derived from the 14-day range
  const headerMonth = MONTH_NAMES[weekStart.getMonth()];
  const endDate = new Date(weekStart);
  endDate.setDate(endDate.getDate() + 13);
  const headerEnd = MONTH_NAMES[endDate.getMonth()];
  const headerLabel =
    weekStart.getMonth() === endDate.getMonth()
      ? `${headerMonth} ${weekStart.getFullYear()}`
      : weekStart.getFullYear() === endDate.getFullYear()
        ? `${headerMonth} – ${headerEnd} ${weekStart.getFullYear()}`
        : `${headerMonth} ${weekStart.getFullYear()} – ${headerEnd} ${endDate.getFullYear()}`;

  const navigateWeek = (dir: -1 | 1) => {
    setWeekStart(prev => {
      const next = new Date(prev);
      next.setDate(next.getDate() + dir * 7);
      return next;
    });
  };

  const jumpToToday = () => {
    const now = new Date();
    setWeekStart(getWeekStart(now));
    onDateChange(formatYMD(now));
  };

  const handleCalendarSelect = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    const dateStr = formatYMD(d);
    setWeekStart(getWeekStart(d));
    onDateChange(dateStr);
    setCalendarVisible(false);
  };

  const openCalendar = () => {
    // Sync calendar month to current selection
    setCalMonth(selectedDateObj.getMonth());
    setCalYear(selectedDateObj.getFullYear());
    setCalendarVisible(true);
  };

  const navigateCalMonth = (dir: -1 | 1) => {
    let newMonth = calMonth + dir;
    let newYear = calYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setCalMonth(newMonth);
    setCalYear(newYear);
  };

  // Scroll to selected date within the scroll view
  useEffect(() => {
    const idx = days.findIndex(d => d.date === selectedDate);
    if (idx >= 0 && scrollRef.current) {
      const timer = setTimeout(() => {
        scrollRef.current?.scrollTo({ x: Math.max(0, idx * 58 - 60), animated: true });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [weekStart, selectedDate]);

  const calendarWeeks = useMemo(() => buildCalendarMonth(calYear, calMonth), [calYear, calMonth]);

  return (
    <View>
      {/* Month/Year header with navigation */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigateWeek(-1)} style={styles.arrowBtn} activeOpacity={0.6}>
          <Text style={styles.arrow}>‹</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openCalendar} style={styles.headerCenter} activeOpacity={0.7}>
          <Text style={styles.headerLabel}>{headerLabel}</Text>
          <Text style={styles.headerCaret}>▾</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateWeek(1)} style={styles.arrowBtn} activeOpacity={0.6}>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {selectedDate !== today && (
          <TouchableOpacity onPress={jumpToToday} style={styles.todayBtn} activeOpacity={0.7}>
            <Text style={styles.todayBtnText}>Today</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Day bar */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dayBar}
      >
        {days.map(d => {
          const active = d.date === selectedDate;
          return (
            <TouchableOpacity
              key={d.date}
              style={[styles.btn, active && styles.btnActive, d.isToday && !active && styles.btnToday]}
              onPress={() => onDateChange(d.date)}
              activeOpacity={0.7}
            >
              <Text style={[styles.dayLabel, active && styles.dayLabelActive]}>
                {d.isToday ? 'Today' : d.label}
              </Text>
              <Text style={[styles.dateNum, active && styles.dateNumActive]}>
                {d.dayNum}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Calendar Modal */}
      <Modal visible={calendarVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setCalendarVisible(false)}
        >
          <View style={styles.calendarCard} onStartShouldSetResponder={() => true}>
            {/* Calendar header */}
            <View style={styles.calHeader}>
              <TouchableOpacity onPress={() => navigateCalMonth(-1)} style={styles.calArrowBtn}>
                <Text style={styles.calArrow}>‹</Text>
              </TouchableOpacity>
              <Text style={styles.calTitle}>
                {MONTH_NAMES[calMonth]} {calYear}
              </Text>
              <TouchableOpacity onPress={() => navigateCalMonth(1)} style={styles.calArrowBtn}>
                <Text style={styles.calArrow}>›</Text>
              </TouchableOpacity>
            </View>

            {/* Day-of-week headers */}
            <View style={styles.calWeekRow}>
              {SHORT_DAY_NAMES.map(dn => (
                <Text key={dn} style={styles.calDayHeader}>{dn}</Text>
              ))}
            </View>

            {/* Calendar grid */}
            {calendarWeeks.map((week, wi) => (
              <View key={wi} style={styles.calWeekRow}>
                {week.map((day, di) => {
                  if (day === null) {
                    return <View key={di} style={styles.calCell} />;
                  }
                  const dateStr = formatYMD(new Date(calYear, calMonth, day));
                  const isSelected = dateStr === selectedDate;
                  const isTodayCell = dateStr === today;
                  return (
                    <TouchableOpacity
                      key={di}
                      style={[
                        styles.calCell,
                        isSelected && styles.calCellSelected,
                        isTodayCell && !isSelected && styles.calCellToday,
                      ]}
                      onPress={() => handleCalendarSelect(day)}
                      activeOpacity={0.6}
                    >
                      <Text
                        style={[
                          styles.calCellText,
                          isSelected && styles.calCellTextSelected,
                          isTodayCell && !isSelected && styles.calCellTextToday,
                        ]}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}

            {/* Today shortcut in modal */}
            <TouchableOpacity
              style={styles.calTodayBtn}
              onPress={() => {
                const now = new Date();
                handleCalendarSelect(now.getDate());
                setCalMonth(now.getMonth());
                setCalYear(now.getFullYear());
              }}
            >
              <Text style={styles.calTodayBtnText}>Go to Today</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CAL_CELL_SIZE = Math.floor((SCREEN_WIDTH - 80) / 7);

const styles = StyleSheet.create({
  /* ——— Header row ——— */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  arrowBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 22,
    fontWeight: '600',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerLabel: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  headerCaret: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    marginTop: 1,
  },
  todayBtn: {
    marginLeft: 'auto',
    backgroundColor: 'rgba(139,92,246,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.4)',
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  todayBtnText: {
    color: '#C4B5FD',
    fontSize: 11,
    fontWeight: '700',
  },

  /* ——— Day bar ——— */
  dayBar: {
    paddingHorizontal: 16,
    gap: 6,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    minWidth: 52,
  },
  btnActive: {
    borderColor: 'rgba(139,92,246,0.5)',
    backgroundColor: 'rgba(139,92,246,0.2)',
  },
  btnToday: {
    borderColor: 'rgba(139,92,246,0.2)',
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.45)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dayLabelActive: {
    color: '#C4B5FD',
  },
  dateNum: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
    marginTop: 1,
  },
  dateNumActive: {
    color: '#fff',
  },

  /* ——— Calendar modal ——— */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarCard: {
    width: SCREEN_WIDTH - 48,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.2)',
  },
  calHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  calArrowBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calArrow: {
    color: '#C4B5FD',
    fontSize: 24,
    fontWeight: '600',
  },
  calTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  calWeekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  calDayHeader: {
    width: CAL_CELL_SIZE,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.35)',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
  },
  calCell: {
    width: CAL_CELL_SIZE,
    height: CAL_CELL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CAL_CELL_SIZE / 2,
  },
  calCellSelected: {
    backgroundColor: 'rgba(139,92,246,0.35)',
  },
  calCellToday: {
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.4)',
  },
  calCellText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: '600',
  },
  calCellTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  calCellTextToday: {
    color: '#C4B5FD',
  },
  calTodayBtn: {
    marginTop: 12,
    alignSelf: 'center',
    backgroundColor: 'rgba(139,92,246,0.2)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  calTodayBtnText: {
    color: '#C4B5FD',
    fontSize: 13,
    fontWeight: '700',
  },
});
