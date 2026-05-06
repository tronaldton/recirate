import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: window.location.origin }
        })
    }

    const handleEmailLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.signInWithOtp({ email })
        if (error) {
            setMessage(error.message)
        } else {
            setMessage('✉️ Check your email for a magic link!')
        }
        setLoading(false)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Google Button */}
            <button
                onClick={handleGoogleLogin}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.85rem 1.5rem',
                    background: 'white',
                    border: '1.5px solid #E8DECE',
                    borderRadius: '50px',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    fontFamily: 'DM Sans, sans-serif',
                    color: '#1C1A17',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#C4622D'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#E8DECE'}
            >
                <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ flex: 1, height: '1px', background: '#E8DECE' }} />
                <span style={{ fontSize: '0.78rem', color: '#8A8075', fontWeight: 500 }}>or</span>
                <div style={{ flex: 1, height: '1px', background: '#E8DECE' }} />
            </div>

            {/* Email Magic Link */}
            <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{
                        width: '100%',
                        padding: '0.85rem 1.2rem',
                        border: '1.5px solid #E8DECE',
                        borderRadius: '50px',
                        fontSize: '0.92rem',
                        fontFamily: 'DM Sans, sans-serif',
                        color: '#1C1A17',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box',
                    }}
                    onFocus={e => e.target.style.borderColor = '#C4622D'}
                    onBlur={e => e.target.style.borderColor = '#E8DECE'}
                />
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '0.85rem 1.5rem',
                        background: loading ? '#E8DECE' : '#C4622D',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50px',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        fontFamily: 'DM Sans, sans-serif',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'background 0.2s',
                    }}
                >
                    {loading ? 'Sending…' : 'Send Magic Link ✉️'}
                </button>
            </form>

            {message && (
                <p style={{
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    color: message.includes('error') || message.includes('Error') ? '#C4622D' : '#4A6741',
                    background: message.includes('error') || message.includes('Error') ? 'rgba(196,98,45,0.08)' : 'rgba(74,103,65,0.08)',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    fontWeight: 500,
                }}>
                    {message}
                </p>
            )}

            <p style={{ textAlign: 'center', fontSize: '0.72rem', color: '#C5BFB5', marginTop: '0.25rem' }}>
                No password needed. Sign in securely with Google or a magic link.
            </p>
        </div>
    )
}