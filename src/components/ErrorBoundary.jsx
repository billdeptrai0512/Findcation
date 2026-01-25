import { Component } from 'react';
import { logger } from '../utils/logger';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details
        logger.error('Error Boundary caught an error:', error);
        logger.error('Error Info:', errorInfo);

        this.setState({
            error,
            errorInfo
        });
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });

        // Reload the page
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    padding: '2rem',
                    textAlign: 'center',
                    backgroundColor: '#f5f5f5'
                }}>
                    <div style={{
                        maxWidth: '600px',
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        <h1 style={{
                            fontSize: '2rem',
                            marginBottom: '1rem',
                            color: '#d32f2f'
                        }}>
                            Đã xảy ra lỗi
                        </h1>

                        <p style={{
                            fontSize: '1rem',
                            marginBottom: '2rem',
                            color: '#666'
                        }}>
                            Xin lỗi, đã có lỗi xảy ra. Vui lòng tải lại trang.
                        </p>

                        {import.meta.env.DEV && this.state.error && (
                            <details style={{
                                marginBottom: '2rem',
                                textAlign: 'left',
                                padding: '1rem',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '4px',
                                fontSize: '0.875rem'
                            }}>
                                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                                    Chi tiết lỗi (chỉ hiển thị trong development)
                                </summary>
                                <pre style={{
                                    marginTop: '1rem',
                                    overflow: 'auto',
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word'
                                }}>
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}

                        <button
                            onClick={this.handleReset}
                            style={{
                                padding: '0.75rem 2rem',
                                fontSize: '1rem',
                                backgroundColor: '#1976d2',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#1565c0'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#1976d2'}
                        >
                            Tải lại trang
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
