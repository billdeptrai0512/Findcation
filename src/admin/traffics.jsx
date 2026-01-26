import { useState, useMemo } from "react";
import { Eye, MousePointer, AlertTriangle, X, ArrowRight, CheckCircle } from "lucide-react";
import styles from "./traffics.module.css";

export default function Traffics({ traffics }) {

    const [selectedSession, setSelectedSession] = useState(null);

    // Group traffic by session ID
    const sessionGroups = useMemo(() => {
        const groups = {};
        traffics.forEach(traffic => {
            const sessionId = traffic.sessionId;
            if (!groups[sessionId]) {
                groups[sessionId] = [];
            }
            groups[sessionId].push(traffic);
        });

        // Sort events within each session by date
        Object.keys(groups).forEach(sessionId => {
            groups[sessionId].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        });

        return groups;
    }, [traffics]);

    // Calculate metrics
    const metrics = useMemo(() => {
        return {
            totalViews: traffics.filter(t => t.trafficType === 'VIEW').length,
            totalClicks: traffics.filter(t => t.trafficType === 'CONTACT_CLICK').length,
            totalSuccess: traffics.filter(t => t.trafficType === 'CONTACT_SUCCESS').length,
            warningsShown: traffics.filter(t => t.trafficType === 'CONTACT_WARNING_SHOWN').length,
            warningsCanceled: traffics.filter(t => t.trafficType === 'CONTACT_WARNING_CANCEL').length,
            warningsContinued: traffics.filter(t => t.trafficType === 'CONTACT_CONTINUE').length,
        };
    }, [traffics]);

    // Get session status
    const getSessionStatus = (events) => {
        const types = events.map(e => e.trafficType);
        if (types.includes('CONTACT_SUCCESS')) return 'success';
        if (types.includes('CONTACT_WARNING_CANCEL')) return 'canceled';
        return 'incomplete';
    };

    // Get event icon and color
    const getEventIcon = (type) => {
        switch (type) {
            case 'VIEW': return { icon: Eye, color: '#3b82f6' };
            case 'CONTACT_CLICK': return { icon: MousePointer, color: '#8b5cf6' };
            case 'CONTACT_WARNING_SHOWN': return { icon: AlertTriangle, color: '#f59e0b' };
            case 'CONTACT_WARNING_CANCEL': return { icon: X, color: '#ef4444' };
            case 'CONTACT_CONTINUE': return { icon: ArrowRight, color: '#10b981' };
            case 'CONTACT_SUCCESS': return { icon: CheckCircle, color: '#22c55e' };
            default: return { icon: Eye, color: '#6b7280' };
        }
    };

    // Format time difference
    const getTimeDiff = (current, previous) => {
        if (!previous) return '';
        const diff = new Date(current.createdAt) - new Date(previous.createdAt);
        const seconds = Math.floor(diff / 1000);
        if (seconds < 60) return `+${seconds}s`;
        const minutes = Math.floor(seconds / 60);
        return `+${minutes}m ${seconds % 60}s`;
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const sessionIds = Object.keys(sessionGroups).reverse(); // Newest first

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>📊 Traffic Analytics</h1>

            {/* Summary Metrics */}
            <div className={styles.metrics_grid}>
                <div className={styles.metric_card}>
                    <Eye size={24} color="#3b82f6" />
                    <div className={styles.metric_content}>
                        <div className={styles.metric_value}>{metrics.totalViews}</div>
                        <div className={styles.metric_label}>Views</div>
                    </div>
                </div>

                <div className={styles.metric_card}>
                    <MousePointer size={24} color="#8b5cf6" />
                    <div className={styles.metric_content}>
                        <div className={styles.metric_value}>{metrics.totalClicks}</div>
                        <div className={styles.metric_label}>Clicks</div>
                    </div>
                </div>

                <div className={styles.metric_card}>
                    <CheckCircle size={24} color="#22c55e" />
                    <div className={styles.metric_content}>
                        <div className={styles.metric_value}>{metrics.totalSuccess}</div>
                        <div className={styles.metric_label}>Success</div>
                    </div>
                </div>

                <div className={styles.metric_card}>
                    <AlertTriangle size={24} color="#f59e0b" />
                    <div className={styles.metric_content}>
                        <div className={styles.metric_value}>{metrics.warningsShown}</div>
                        <div className={styles.metric_label}>Warnings</div>
                    </div>
                </div>
            </div>

            {/* Warning Impact */}
            {metrics.warningsShown > 0 && (
                <div className={styles.warning_impact}>
                    <h3>⚠️ Warning Impact</h3>
                    <div className={styles.impact_stats}>
                        <div className={styles.impact_item}>
                            <span className={styles.impact_label}>Continued:</span>
                            <span className={styles.impact_value} style={{ color: '#10b981' }}>
                                {metrics.warningsContinued} ({Math.round(metrics.warningsContinued / metrics.warningsShown * 100)}%)
                            </span>
                        </div>
                        <div className={styles.impact_item}>
                            <span className={styles.impact_label}>Canceled:</span>
                            <span className={styles.impact_value} style={{ color: '#ef4444' }}>
                                {metrics.warningsCanceled} ({Math.round(metrics.warningsCanceled / metrics.warningsShown * 100)}%)
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Session Timeline */}
            <div className={styles.sessions_container}>
                <h2 className={styles.section_title}>🔍 User Sessions ({sessionIds.length})</h2>

                {sessionIds.map(sessionId => {
                    const events = sessionGroups[sessionId];
                    const status = getSessionStatus(events);
                    const firstEvent = events[0];
                    const staycationName = firstEvent.staycation?.name || 'Unknown';

                    return (
                        <div
                            key={sessionId}
                            className={`${styles.session_card} ${styles[`status_${status}`]}`}
                            onClick={() => setSelectedSession(selectedSession === sessionId ? null : sessionId)}
                        >
                            {/* Session Header */}
                            <div className={styles.session_header}>
                                <div className={styles.session_info}>
                                    <span className={styles.session_id}>Session: {sessionId.slice(0, 8)}...</span>
                                    <span className={styles.session_staycation}>{staycationName}</span>
                                </div>
                                <div className={styles.session_status}>
                                    {status === 'success' && <span className={styles.badge_success}>✅ Success</span>}
                                    {status === 'canceled' && <span className={styles.badge_canceled}>❌ Canceled</span>}
                                    {status === 'incomplete' && <span className={styles.badge_incomplete}>⏳ Incomplete</span>}
                                </div>
                            </div>

                            {/* Session Events */}
                            {selectedSession === sessionId && (
                                <div className={styles.session_events}>
                                    {events.map((event, index) => {
                                        const { icon: Icon, color } = getEventIcon(event.trafficType);
                                        const timeDiff = getTimeDiff(event, events[index - 1]);

                                        return (
                                            <div key={event.id} className={styles.event_item}>
                                                <div className={styles.event_icon} style={{ backgroundColor: `${color}20`, color }}>
                                                    <Icon size={16} />
                                                </div>
                                                <div className={styles.event_content}>
                                                    <div className={styles.event_type}>{event.trafficType}</div>
                                                    <div className={styles.event_details}>
                                                        {formatDate(event.createdAt)}
                                                        {timeDiff && <span className={styles.time_diff}>{timeDiff}</span>}
                                                        {event.platform !== 'NULL' && (
                                                            <span className={styles.platform}> • {event.platform}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function convertDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}
