import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cases {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  @ApiProperty({ description: 'Relation id', type: String })
  id: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Variant Location', type: String })
  location: string;

  @Column({ type: 'date' })
  @IsDateString()
  @ApiProperty({ description: 'Variant occurence location', type: String })
  date: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Variant occurence date', type: String })
  variant: string;

  @Column({ type: 'int', name: 'num_sequences' })
  @IsNumber()
  @ApiProperty({ description: 'Number of sequences processed', type: Number })
  numSequences: number;

  @Column({ type: 'decimal', name: 'perc_sequences' })
  @IsNumber()
  @ApiProperty({ description: 'Percentage of sequences ', type: Number })
  percSequences: number;

  @Column({ type: 'int', name: 'num_sequences_total' })
  @IsNumber()
  @ApiProperty({ description: 'Total number of sequences', type: Number })
  numSequencesTotal: number;
}
