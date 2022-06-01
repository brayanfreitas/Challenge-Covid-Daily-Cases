import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cases {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  @ApiProperty({ description: 'Relation id' })
  id: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Variant Location' })
  location: string;

  @Column({})
  @IsDateString()
  @ApiProperty({ description: 'Variant occurence location' })
  date: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Variant occurence date' })
  variant: string;

  @Column({ type: 'int', name: 'num_sequences' })
  @IsNumber()
  @ApiProperty({ description: 'Number of sequences processed' })
  numSequences: number;

  @Column({ type: 'decimal', name: 'perc_sequences' })
  @IsNumber()
  @ApiProperty({ description: 'Percentage of sequences ' })
  percSequences: number;

  @Column({ type: 'int' })
  @IsNumber()
  @ApiProperty({ description: 'Total number of sequences' })
  numSequencesTotal: number;
}
