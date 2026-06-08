#!/usr/bin/env python3
"""Fix the verification field placement issue in data.js."""
import re

with open(r'C:\Users\chenqi\Desktop\tod\web\NBA AI经理 · 交易模拟器_files\js\data.js', 'r', encoding='utf-8') as f:
    c = f.read()

# The problem: verification was inserted inside stats{} instead of player level
# Fix: replace 'verification:"NEEDS_VERIFICATION"' that's inside stats{} blocks
# by moving it outside

# Pattern: inside stats:{...verification...} }
# We need to find cases where verification is right before the closing }} of a player

# Strategy: For each player object, verify the structure
# Current (broken): stats:{g:72, ..., verification:"NEEDS_VERIFICATION" },
# Fixed: stats:{g:72, ...}, verification:"NEEDS_VERIFICATION" 

# Replace pattern: inside stats block
# stats:{...verification:"NEEDS_VERIFICATION" } 
# -> stats:{...}, verification:"NEEDS_VERIFICATION" 

# The issue is that the braces got messed up. Let me just redo the whole thing properly.

# Find all player objects and fix
# A player object looks like: { id:'...', ... stats:{...} }
# After broken fix: { id:'...', ... stats:{..., verification:"NEEDS_VERIFICATION" } }
# Note: missing closing } for player

# Fix: move verification out of stats and add missing closing brace
count = 0

# Pattern: , verification:"NEEDS_VERIFICATION" } inside stats followed by ,
# The stats closing is: ...stats:{...fields..., verification:"NEEDS_VERIFICATION" },
# Need to change to: ...stats:{...fields...}, verification:"NEEDS_VERIFICATION" },
# But there's also a missing player closing brace!

# Actually let's trace through exactly:
# Original: ...stats:{fg:1, fga:0.5}  }
# After rstrip(' }'): ...stats:{fg:1, fga:0.5
# After append: ...stats:{fg:1, fga:0.5, verification:"NEEDS_VERIFICATION" }
# So it becomes: stats:{... verification} instead of stats:{...}, verification

# Fix: move verification out of stats:
c = c.replace(
    ', verification:"NEEDS_VERIFICATION" }', 
    '}, verification:"NEEDS_VERIFICATION" }'
)

# Also need to add player closing brace for each fixed player
# After fix: stats:{...}, verification:"NEEDS_VERIFICATION" } 
# We need: stats:{...}, verification:"NEEDS_VERIFICATION" }
# Wait, the stats already has its closing } (it was never removed from stats)
# Actually stats close is inside the original
# Original ending: stats:{...}  } - last } is player close
# After fix: stats:{..., verification} - stats close is now `, verification}`
# So we changed } to , verification} which merged stats and player...

# Let me just redo it properly from scratch.
# Strategy: Find each NEEDS_VERIFICATION and check context

with open(r'C:\Users\chenqi\Desktop\tod\web\NBA AI经理 · 交易模拟器_files\js\data.js', 'r', encoding='utf-8') as f:
    c = f.read()

# The proper fix: 
# Current: ...stats:{g:72,..., verification:"NEEDS_VERIFICATION" },
# Target:  ...stats:{g:72,...}, verification:"NEEDS_VERIFICATION" },

# The , verification:... is currently INSIDE stats{} because 
# rstrip(' }') ate both the stats closing } and the player closing }
# Then added , verification } which closed only stats, leaving player unclosed.

# Find all occurrences and fix
fixed_count = 0
result = []
i = 0
while i < len(c):
    pos = c.find('verification:"NEEDS_VERIFICATION"', i)
    if pos == -1:
        result.append(c[i:])
        break
    
    # Add everything up to this point
    result.append(c[i:pos])
    
    # Check context before: we need to find the stats block
    # The stats block ends with ... fields, verification:... }
    # We need to move verification out of stats
    
    # Find the stats { that encloses this verification
    # Go backwards to find "stats:{"
    before = c[max(0,pos-200):pos]
    stats_start = before.rfind('stats:{')
    if stats_start >= 0:
        # Found! The verification is inside stats.
        # We need to close stats before the verification
        # stats:{... , verification:"NEEDS_VERIFICATION" } 
        # Should become:
        # stats:{...}, verification:"NEEDS_VERIFICATION" } 
        
        # But what's after the verification?
        after_pos = pos + len('verification:"NEEDS_VERIFICATION"')
        after = c[after_pos:after_pos+5]
        
        if after.startswith('" }'):
            # Case: ... , verification:"NEEDS_VERIFICATION" },
            # After our broken code: the } closes stats, , closes player array slot
            # We need TWO closings: one for stats, one for player, then ,
            
            # Current: stats:{...fields, verification:"NEEDS_VERIFICATION" },
            # The , after the } is the array separator
            # Problem: stats has only ONE } closing both stats AND player
            
            # Fix: add an extra } before the verification
            # stats:{...fields}, verification:"NEEDS_VERIFICATION" },
            result.append('}, verification:"NEEDS_VERIFICATION"')
            i = after_pos + 2  # skip " }
            fixed_count += 1
            continue
        elif after.startswith('" },'):
            result.append('}, verification:"NEEDS_VERIFICATION"')
            i = after_pos + 4  # skip " },
            fixed_count += 1
            continue
        elif after.startswith('" }\n'):
            result.append('}, verification:"NEEDS_VERIFICATION"')
            i = after_pos + 3
            fixed_count += 1
            continue
        else:
            # Unknown pattern, just pass through
            result.append(c[pos:pos+len('verification:"NEEDS_VERIFICATION"')])
            i = after_pos
            continue
    else:
        # Not inside stats, pass through
        result.append(c[pos:pos+len('verification:"NEEDS_VERIFICATION"')])
        i = pos + len('verification:"NEEDS_VERIFICATION"')

fixed = ''.join(result)

# Verify brace balance in TEAMS_DATA
td_start = fixed.find('var TEAMS_DATA')
td_end = fixed.find('var DRAFT_PICK')
td_block = fixed[td_start:td_end]
o = td_block.count('{')
cl = td_block.count('}')
print(f"Before fix: TEAMS_DATA braces open={o} close={cl} diff={o-cl}")

with open(r'C:\Users\chenqi\Desktop\tod\web\NBA AI经理 · 交易模拟器_files\js\data.js', 'w', encoding='utf-8') as f:
    f.write(fixed)

print(f"Fixed {fixed_count} verification placements")

# Recheck
with open(r'C:\Users\chenqi\Desktop\tod\web\NBA AI经理 · 交易模拟器_files\js\data.js', 'r', encoding='utf-8') as f:
    c = f.read()
td_start = c.find('var TEAMS_DATA')
td_end = c.find('var DRAFT_PICK')
td_block = c[td_start:td_end]
o = td_block.count('{')
cl = td_block.count('}')
print(f"After fix: TEAMS_DATA braces open={o} close={cl} diff={o-cl}")

full_o = c.count('{')
full_cl = c.count('}')
print(f"Full file: open={full_o} close={full_cl} diff={full_o - full_cl}")

# Count players
players = len(re.findall(r"id:\s*'[a-z]{3}-[a-z0-9]+", c))
print(f"Total player entries: {players}")
