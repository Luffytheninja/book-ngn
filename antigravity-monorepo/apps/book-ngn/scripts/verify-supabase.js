const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xk0K3-RDoR6Y7eC_32Eg_xnjkKjvA.supabase.co';
const supabaseAnonKey = 'pb_publishable_R_xk0K3-RDoR6Y7eC_32Eg_xnjkKjvA'; // Corrected prefix from my previous guess if needed, but using what was provided

async function verifySchema() {
    const supabase = createClient(supabaseUrl, 'sb_publishable_R_xk0K3-RDoR6Y7eC_32Eg_xnjkKjvA');

    console.log('Verifying table: bookkeeping_data...');

    const { error } = await supabase
        .from('bookkeeping_data')
        .select('*')
        .limit(1);

    if (error) {
        if (error.code === '42P01') {
            console.error('❌ Table "bookkeeping_data" DOES NOT exist.');
        } else {
            console.error('⚠️ Unexpected error:', error.message);
        }
    } else {
        console.log('✅ Table "bookkeeping_data" EXISTS and is accessible.');
    }
}

verifySchema();
