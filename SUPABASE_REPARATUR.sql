-- Bibani Select: fehlende Marktzuordnung in bestehenden Verkäufen ergänzen.
-- Bestehende Daten bleiben erhalten.
ALTER TABLE public.bs_sales ADD COLUMN IF NOT EXISTS market_id uuid;
-- PostgREST-Schema-Cache aktualisieren
NOTIFY pgrst, 'reload schema';
