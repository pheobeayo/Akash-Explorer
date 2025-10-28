import React, { useState } from 'react';
import { Box, Icon, Text, useColorModeValue } from '@interchain-ui/react';

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
    const akashPrimary = '#FF414C';
    const bgColor = useColorModeValue('#000000', '#000000');
    const textColor = useColorModeValue('#FFFFFF', '#FFFFFF');
    const textSecondary = useColorModeValue('#9CA3AF', '#9CA3AF');
    const cardBg = 'rgba(255, 65, 76, 0.1)';
    const cardBorder = 'rgba(255, 65, 76, 0.3)';

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
            background: `linear-gradient(135deg, ${bgColor} 0%, #1a0505 50%, ${bgColor} 100%)`,
            padding: '3rem'
        }}>
            <Box maxWidth="1280px" mx="auto">
                {/* Header */}
                <div style={{ marginBottom: '3rem' }}>
                    <Box textAlign="center">
                        <div style={{ marginBottom: '1.5rem' }}>
                            <Box display="flex" alignItems="center" justifyContent="center" gap="$4">
                                <Icon name="walletFilled" size="$2xl" color={akashPrimary} />
                                <Text fontSize="$4xl" fontWeight="$bold" color={textColor}>
                                    Akash Network
                                </Text>
                            </Box>
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <Text fontSize="$2xl" fontWeight="$semibold" color={akashPrimary}>
                                Top Holders Distribution
                            </Text>
                        </div>
                        <Text color={textSecondary}>
                            Bubble size represents token holdings
                        </Text>
                    </Box>
                </div>

                {/* Stats Bar */}
                <div style={{ marginBottom: '3rem' }}>
                    <Box
                        display="grid"
                        gridTemplateColumns={{ mobile: '1fr', tablet: 'repeat(3, 1fr)' }}
                        gap="$6"
                    >
                        <Box
                            backgroundColor={cardBg}
                            borderRadius="$lg"
                            p="$8"
                            border={`1px solid ${cardBorder}`}
                        >
                            <Box display="flex" alignItems="center" gap="$4">
                                <Box color={akashPrimary}>
                                    <UsersIcon />
                                </Box>
                                <Box>
                                    <div style={{ marginBottom: '0.25rem' }}>
                                        <Text color={textSecondary} fontSize="$sm">
                                            Total Holders
                                        </Text>
                                    </div>
                                    <Text color={textColor} fontSize="$3xl" fontWeight="$bold">
                                        {holders.length}
                                    </Text>
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            backgroundColor={cardBg}
                            borderRadius="$lg"
                            p="$8"
                            border={`1px solid ${cardBorder}`}
                        >
                            <Box display="flex" alignItems="center" gap="$4">
                                <Icon name="arrowUpS" size="$xl" color={akashPrimary} />
                                <Box>
                                    <div style={{ marginBottom: '0.25rem' }}>
                                        <Text color={textSecondary} fontSize="$sm">
                                            Largest Holder
                                        </Text>
                                    </div>
                                    <Text color={textColor} fontSize="$3xl" fontWeight="$bold">
                                        {holders[0]?.percentage}%
                                    </Text>
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            backgroundColor={cardBg}
                            borderRadius="$lg"
                            p="$8"
                            border={`1px solid ${cardBorder}`}
                        >
                            <Box display="flex" alignItems="center" gap="$4">
                                <Icon name="walletFilled" size="$xl" color={akashPrimary} />
                                <Box>
                                    <div style={{ marginBottom: '0.25rem' }}>
                                        <Text color={textSecondary} fontSize="$sm">
                                            Top 15 Control
                                        </Text>
                                    </div>
                                    <Text color={textColor} fontSize="$3xl" fontWeight="$bold">
                                        {holders.slice(0, 15).reduce((sum, h) => sum + h.percentage, 0).toFixed(1)}%
                                    </Text>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </div>

                {/* Bubble Map Container */}
                <div style={{ marginBottom: '3rem' }}>
                    <Box
                        backgroundColor="rgba(255, 65, 76, 0.05)"
                        borderRadius="$2xl"
                        p="$12"
                        border="1px solid rgba(255, 65, 76, 0.2)"
                    >
                        <Box position="relative" height="600px">
                            {holders.map((holder, index) => {
                                const size = getBubbleSize(holder.balance);
                                const position = calculateBubblePosition(index, holders.length);
                                const isHovered = hoveredHolder === holder.address;
                                const isSelected = selectedHolder === holder.address;

                                return (
                                    <Box
                                        key={holder.address}
                                        position="absolute"
                                        width={`${size}px`}
                                        height={`${size}px`}
                                        attributes={{
                                            style: {
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
                                            },
                                            onMouseEnter: () => setHoveredHolder(holder.address),
                                            onMouseLeave: () => setHoveredHolder(null),
                                            onClick: () => setSelectedHolder(selectedHolder === holder.address ? null : holder.address)
                                        }}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Box textAlign="center" color="white" fontWeight="$bold">
                                            <Text fontSize="$sm">#{holder.rank}</Text>
                                            <div style={{ marginTop: '0.25rem' }}>
                                                <Text fontSize="$xs">{holder.percentage}%</Text>
                                            </div>
                                        </Box>

                                        {/* Tooltip */}
                                        {(isHovered || isSelected) && (
                                            <Box
                                                position="absolute"
                                                attributes={{
                                                    style: {
                                                        bottom: '100%',
                                                        marginBottom: '8px',
                                                        background: '#1A1A1A',
                                                        color: 'white',
                                                        padding: '12px',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                                                        whiteSpace: 'nowrap',
                                                        zIndex: 20,
                                                        border: `1px solid ${akashPrimary}`
                                                    }
                                                }}
                                            >
                                                <div style={{ marginBottom: '0.25rem' }}>
                                                    <Text fontSize="$xs" fontWeight="$semibold" color={akashPrimary}>
                                                        Rank #{holder.rank}
                                                    </Text>
                                                </div>
                                                <div style={{ marginBottom: '0.25rem' }}>
                                                    <Text fontSize="$sm" fontFamily="monospace">
                                                        {holder.address}
                                                    </Text>
                                                </div>
                                                <div style={{ marginBottom: '0.25rem' }}>
                                                    <Text fontSize="$sm" fontWeight="$bold">
                                                        {formatBalance(holder.balance)} AKT
                                                    </Text>
                                                </div>
                                                <Text fontSize="$xs" color={textSecondary}>
                                                    {holder.percentage}% of supply
                                                </Text>
                                                <Box
                                                    attributes={{
                                                        style: {
                                                            position: 'absolute',
                                                            bottom: 0,
                                                            left: '50%',
                                                            transform: 'translate(-50%, 100%)',
                                                            width: 0,
                                                            height: 0,
                                                            borderLeft: '8px solid transparent',
                                                            borderRight: '8px solid transparent',
                                                            borderTop: '8px solid #1A1A1A'
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        )}
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                </div>

                {/* Legend */}
                <Box
                    backgroundColor="rgba(255, 65, 76, 0.05)"
                    borderRadius="$lg"
                    p="$10"
                    border="1px solid rgba(255, 65, 76, 0.2)"
                >
                    <div style={{ marginBottom: '1.5rem' }}>
                        <Text color={textColor} fontWeight="$semibold" fontSize="$lg">
                            Top 15 Holders
                        </Text>
                    </div>
                    <Box
                        display="grid"
                        gridTemplateColumns={{ mobile: '1fr', tablet: 'repeat(2, 1fr)', desktop: 'repeat(3, 1fr)' }}
                        gap="$4"
                    >
                        {holders.slice(0, 15).map((holder) => (
                            <Box
                                key={holder.address}
                                display="flex"
                                alignItems="center"
                                gap="$4"
                                p="$3"
                                borderRadius="$md"
                                cursor="pointer"
                                backgroundColor={hoveredHolder === holder.address ? cardBg : 'transparent'}
                                attributes={{
                                    style: { transition: 'background-color 0.2s' },
                                    onMouseEnter: () => setHoveredHolder(holder.address),
                                    onMouseLeave: () => setHoveredHolder(null),
                                    onClick: () => setSelectedHolder(selectedHolder === holder.address ? null : holder.address)
                                }}
                            >
                                <Box
                                    width="16px"
                                    height="16px"
                                    borderRadius="$full"
                                    flexShrink={0}
                                    attributes={{
                                        style: { backgroundColor: getColor(holder.rank - 1) }
                                    }}
                                />
                                <Box flex={1} minWidth={0} display="flex" alignItems="center" justifyContent="space-between" gap="$3">
                                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        <Text
                                            color={textColor}
                                            fontSize="$sm"
                                            fontFamily="monospace"
                                        >
                                            #{holder.rank} {holder.address}
                                        </Text>
                                    </span>
                                    <span style={{ whiteSpace: 'nowrap' }}>
                                        <Text color={akashPrimary} fontSize="$sm" fontWeight="$semibold">
                                            {holder.percentage}%
                                        </Text>
                                    </span>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Instructions */}
                <div style={{ marginTop: '2.5rem' }}>
                    <Box textAlign="center" color={textSecondary} fontSize="$sm">
                        <Text>
                            Hover over bubbles to see details • Click to pin selection • Larger bubbles = more tokens
                        </Text>
                    </Box>
                </div>
            </Box>
        </div>
    );
};

export default TopHoldersBubbleMap;