import React, { useState } from 'react';
import { Icon } from '@interchain-ui/react';

interface Holder {
    address: string;
    balance: number;
    percentage: number;
    rank: number;
}

interface BubblePosition {
    left: number;
    top: number;
}

const TopHoldersBubbleMap: React.FC = () => {
    const [holders] = useState<Holder[]>([
        { address: 'akash1abc...xyz1', balance: 15000000, percentage: 15.5, rank: 1 },
        { address: 'akash1def...xyz2', balance: 12000000, percentage: 12.3, rank: 2 },
        { address: 'akash1ghi...xyz3', balance: 10000000, percentage: 10.2, rank: 3 },
        { address: 'akash1jkl...xyz4', balance: 8500000, percentage: 8.7, rank: 4 },
        { address: 'akash1mno...xyz5', balance: 7000000, percentage: 7.2, rank: 5 },
        { address: 'akash1pqr...xyz6', balance: 6000000, percentage: 6.1, rank: 6 },
        { address: 'akash1stu...xyz7', balance: 5200000, percentage: 5.3, rank: 7 },
        { address: 'akash1vwx...xyz8', balance: 4500000, percentage: 4.6, rank: 8 },
        { address: 'akash1yza...xyz9', balance: 3800000, percentage: 3.9, rank: 9 },
        { address: 'akash1bcd...xy10', balance: 3200000, percentage: 3.3, rank: 10 },
        { address: 'akash1efg...xy11', balance: 2800000, percentage: 2.9, rank: 11 },
        { address: 'akash1hij...xy12', balance: 2400000, percentage: 2.5, rank: 12 },
        { address: 'akash1klm...xy13', balance: 2000000, percentage: 2.0, rank: 13 },
        { address: 'akash1nop...xy14', balance: 1800000, percentage: 1.8, rank: 14 },
        { address: 'akash1qrs...xy15', balance: 1500000, percentage: 1.5, rank: 15 },
    ]);

    const [hoveredHolder, setHoveredHolder] = useState<string | null>(null);
    const [selectedHolder, setSelectedHolder] = useState<string | null>(null);

    // Akash Network official brand colors
    const akashColors = {
        primary: '#FF414C',
        secondary: '#3D4148',
        dark: '#1E1E1E',
        background: '#000000',
        backgroundLight: '#1A1A1A',
        text: '#FFFFFF',
        textSecondary: '#9CA3AF',
        accent: '#EF4444',
    };

    const maxBalance = Math.max(...holders.map(h => h.balance));
    const minBalance = Math.min(...holders.map(h => h.balance));

    const getBubbleSize = (balance: number): number => {
        const minSize = 40;
        const maxSize = 180;
        const normalized = (balance - minBalance) / (maxBalance - minBalance);
        return minSize + normalized * (maxSize - minSize);
    };

    const getColor = (rank: number): string => {
        const colors = [
            '#FF414C', '#FF5058', '#FF5F64', '#FF6E70', '#FF7D7C',
            '#FF8C88', '#FF9B94', '#FFAAA0', '#FFB9AC', '#FFC8B8',
            '#FFD7C4', '#FFE6D0', '#FFF5DC', '#FFF8E8', '#FFFCF4'
        ];
        return colors[rank % colors.length];
    };

    const formatBalance = (balance: number): string => {
        if (balance >= 1000000) {
            return `${(balance / 1000000).toFixed(2)}M`;
        } else if (balance >= 1000) {
            return `${(balance / 1000).toFixed(2)}K`;
        }
        return balance.toLocaleString();
    };

    const UsersIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );

    const calculateBubblePosition = (index: number, total: number): BubblePosition => {
        const containerWidth = 800;
        const containerHeight = 600;
        const padding = 100;

        const angle = index * 2.4;
        const radius = (index / total) * Math.min(containerWidth, containerHeight) / 2.5;
        const x = containerWidth / 2 + radius * Math.cos(angle);
        const y = containerHeight / 2 + radius * Math.sin(angle);

        return {
            left: Math.max(padding, Math.min(x, containerWidth - padding)),
            top: Math.max(padding, Math.min(y, containerHeight - padding))
        };
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: `linear-gradient(135deg, ${akashColors.background} 0%, #1a0505 50%, ${akashColors.background} 100%)`,
            padding: '32px'
        }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
                        <Icon name="walletFilled" size="$2xl" color={akashColors.primary} />
                        <h1 style={{
                            fontSize: '36px',
                            fontWeight: 'bold',
                            color: akashColors.text,
                            margin: 0
                        }}>
                            Akash Network
                        </h1>
                    </div>
                    <h2 style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        color: akashColors.primary,
                        margin: '0 0 8px 0'
                    }}>
                        Top Holders Distribution
                    </h2>
                    <p style={{ color: akashColors.textSecondary, margin: 0 }}>
                        Bubble size represents token holdings
                    </p>
                </div>

                {/* Stats Bar */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '16px',
                    marginBottom: '32px'
                }}>
                    <div style={{
                        background: 'rgba(255, 65, 76, 0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        padding: '20px',
                        border: `1px solid rgba(255, 65, 76, 0.3)`
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ color: akashColors.primary }}>
                                <UsersIcon />
                            </div>
                            <div>
                                <p style={{ color: akashColors.textSecondary, fontSize: '14px', margin: '0 0 4px 0' }}>
                                    Total Holders
                                </p>
                                <p style={{ color: akashColors.text, fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
                                    {holders.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        background: 'rgba(255, 65, 76, 0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        padding: '20px',
                        border: `1px solid rgba(255, 65, 76, 0.3)`
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Icon name="arrowUpS" size="$xl" color={akashColors.primary} />
                            <div>
                                <p style={{ color: akashColors.textSecondary, fontSize: '14px', margin: '0 0 4px 0' }}>
                                    Largest Holder
                                </p>
                                <p style={{ color: akashColors.text, fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
                                    {holders[0]?.percentage}%
                                </p>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        background: 'rgba(255, 65, 76, 0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        padding: '20px',
                        border: `1px solid rgba(255, 65, 76, 0.3)`
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Icon name="walletFilled" size="$xl" color={akashColors.primary} />
                            <div>
                                <p style={{ color: akashColors.textSecondary, fontSize: '14px', margin: '0 0 4px 0' }}>
                                    Top 15 Control
                                </p>
                                <p style={{ color: akashColors.text, fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
                                    {holders.slice(0, 15).reduce((sum, h) => sum + h.percentage, 0).toFixed(1)}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bubble Map Container */}
                <div style={{
                    background: 'rgba(255, 65, 76, 0.05)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    padding: '32px',
                    border: `1px solid rgba(255, 65, 76, 0.2)`,
                    marginBottom: '32px'
                }}>
                    <div style={{ position: 'relative', height: '600px' }}>
                        {holders.map((holder, index) => {
                            const size = getBubbleSize(holder.balance);
                            const position = calculateBubblePosition(index, holders.length);
                            const isHovered = hoveredHolder === holder.address;
                            const isSelected = selectedHolder === holder.address;

                            return (
                                <div
                                    key={holder.address}
                                    style={{
                                        position: 'absolute',
                                        width: `${size}px`,
                                        height: `${size}px`,
                                        left: `${position.left}px`,
                                        top: `${position.top}px`,
                                        backgroundColor: getColor(holder.rank - 1),
                                        transform: `translate(-50%, -50%) scale(${isHovered || isSelected ? 1.1 : 1})`,
                                        opacity: isHovered || isSelected ? 1 : 0.85,
                                        zIndex: isHovered || isSelected ? 10 : 1,
                                        boxShadow: isHovered || isSelected
                                            ? '0 20px 60px rgba(255, 65, 76, 0.5)'
                                            : '0 10px 30px rgba(0, 0, 0, 0.3)',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onMouseEnter={() => setHoveredHolder(holder.address)}
                                    onMouseLeave={() => setHoveredHolder(null)}
                                    onClick={() => setSelectedHolder(selectedHolder === holder.address ? null : holder.address)}
                                >
                                    <div style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
                                        <div style={{ fontSize: '14px' }}>#{holder.rank}</div>
                                        <div style={{ fontSize: '12px', marginTop: '4px' }}>{holder.percentage}%</div>
                                    </div>

                                    {/* Tooltip */}
                                    {(isHovered || isSelected) && (
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '100%',
                                            marginBottom: '8px',
                                            background: akashColors.backgroundLight,
                                            color: 'white',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                                            whiteSpace: 'nowrap',
                                            zIndex: 20,
                                            border: `1px solid ${akashColors.primary}`
                                        }}>
                                            <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px', color: akashColors.primary }}>
                                                Rank #{holder.rank}
                                            </div>
                                            <div style={{ fontSize: '14px', fontFamily: 'monospace', marginBottom: '4px' }}>
                                                {holder.address}
                                            </div>
                                            <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                                                {formatBalance(holder.balance)} AKT
                                            </div>
                                            <div style={{ fontSize: '12px', color: akashColors.textSecondary }}>
                                                {holder.percentage}% of supply
                                            </div>
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: '50%',
                                                transform: 'translate(-50%, 100%)',
                                                width: 0,
                                                height: 0,
                                                borderLeft: '8px solid transparent',
                                                borderRight: '8px solid transparent',
                                                borderTop: `8px solid ${akashColors.backgroundLight}`
                                            }}></div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Legend */}
                <div style={{
                    background: 'rgba(255, 65, 76, 0.05)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    padding: '24px',
                    border: `1px solid rgba(255, 65, 76, 0.2)`
                }}>
                    <h3 style={{
                        color: akashColors.text,
                        fontWeight: '600',
                        marginBottom: '16px',
                        margin: '0 0 16px 0'
                    }}>
                        Top 15 Holders
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '12px'
                    }}>
                        {holders.slice(0, 15).map((holder) => (
                            <div
                                key={holder.address}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s',
                                    backgroundColor: hoveredHolder === holder.address ? 'rgba(255, 65, 76, 0.1)' : 'transparent'
                                }}
                                onMouseEnter={() => setHoveredHolder(holder.address)}
                                onMouseLeave={() => setHoveredHolder(null)}
                                onClick={() => setSelectedHolder(selectedHolder === holder.address ? null : holder.address)}
                            >
                                <div
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '50%',
                                        flexShrink: 0,
                                        backgroundColor: getColor(holder.rank - 1)
                                    }}
                                ></div>
                                <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                                    <span style={{
                                        color: akashColors.text,
                                        fontSize: '14px',
                                        fontFamily: 'monospace',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        #{holder.rank} {holder.address}
                                    </span>
                                    <span style={{
                                        color: akashColors.primary,
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {holder.percentage}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Instructions */}
                <div style={{
                    marginTop: '24px',
                    textAlign: 'center',
                    color: akashColors.textSecondary,
                    fontSize: '14px'
                }}>
                    <p style={{ margin: 0 }}>
                        Hover over bubbles to see details • Click to pin selection • Larger bubbles = more tokens
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TopHoldersBubbleMap;